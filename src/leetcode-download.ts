import * as fs from 'fs/promises'
import * as path from 'path'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import * as prettier from 'prettier'

interface ProblemDetails {
  title: string
  problemNumber: string
  functionSignature: string
  testCases: Array<{
    input: string[]
    output: string
    explanation?: string
  }>
}

// const headers = {
//   'User-Agent':
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
//   Referer: 'https://leetcode.com',
//   'Accept-Language': 'en-US,en;q=0.9',
//   Accept:
//     'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
// }

async function fetchLeetCodeProblem(
  problemUrl: string
): Promise<ProblemDetails> {
  try {
    const tokenResponse = await axios.get('https://leetcode.com', {
      withCredentials: true,
    })
    const csrfToken = tokenResponse.headers['x-csrftoken']

    const response = await axios.get(problemUrl, {
      headers: {
        'x-csrftoken': csrfToken,
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://leetcode.com',
      },
    })

    const dom = new JSDOM(response.data)
    const document = dom.window.document

    // Extract problem number and title
    const titleElement = document.querySelector('div[data-cy="question-title"]')
    const titleText = titleElement
      ? titleElement.textContent?.trim()
      : 'Unknown Problem'
    const problemNumberMatch = titleText?.match(/^\d+\./)
    const problemNumber = problemNumberMatch
      ? problemNumberMatch[0].replace('.', '')
      : 'unknown'

    // Find code block with function signature
    const codeBlocks = document.querySelectorAll('pre.mx-2')
    let functionSignature = ''
    for (const block of codeBlocks) {
      const blockText = block.textContent?.trim() || ''
      if (blockText.startsWith('function') || blockText.includes('(')) {
        functionSignature = blockText
        break
      }
    }

    // Extract test cases from description
    const testCases: ProblemDetails['testCases'] = []
    const exampleSections = document.querySelectorAll('.example')

    exampleSections.forEach((section: any) => {
      const inputText =
        section
          .querySelector('.in')
          ?.textContent?.replace('Input:', '')
          .trim() || ''
      const outputText =
        section
          .querySelector('.out')
          ?.textContent?.replace('Output:', '')
          .trim() || ''
      const explanationText = section
        .querySelector('.explain')
        ?.textContent?.trim()

      // Parse input into an array
      const inputMatch = inputText.match(/\[.*\]|\d+/g)
      const input = inputMatch ? inputMatch.map(parseInput) : []

      testCases.push({
        input,
        output: outputText,
        explanation: explanationText,
      })
    })

    return {
      title: titleText || '',
      problemNumber,
      functionSignature,
      testCases,
    }
  } catch (error) {
    console.error('Error fetching problem:', error)
    throw error
  }
}

function parseInput(input: string): any {
  try {
    // Remove quotes and parse as JSON
    return JSON.parse(input.replace(/'/g, '"'))
  } catch {
    // If parsing fails, return original string
    return input
  }
}

function generateProblemFile(details: ProblemDetails): string {
  const functionName =
    details.functionSignature.match(/function\s+(\w+)/)?.[1] || 'solution'

  return `// LeetCode Problem ${details.problemNumber}: ${details.title}

export function ${functionName}(${details.functionSignature.split('(')[1].split(')')[0]}): any {
  // TODO: Implement solution
  throw new Error('Not implemented');
}
`
}

function generateTestFile(details: ProblemDetails): string {
  const functionName =
    details.functionSignature.match(/function\s+(\w+)/)?.[1] || 'solution'

  const testCaseStrings = details.testCases.map((testCase, index) => {
    const inputStrings = testCase.input.map((input) =>
      typeof input === 'object' ? JSON.stringify(input) : `${input}`
    )

    return `
  await t.test('Test case ${index + 1}', () => {
    const result = ${functionName}(${inputStrings.join(', ')});
    assert.deepStrictEqual(result, ${JSON.stringify(testCase.output)});
  });`
  })

  return `import { test } from 'node:test';
import assert from 'node:assert';
import { ${functionName} } from '../src/${details.problemNumber}-${details.title.toLowerCase().replace(/\s+/g, '-')}.js';

test('${details.title}', async (t) => {
  ${testCaseStrings.join('\n')}
});
`
}

async function updatePackageJson(problemDetails: ProblemDetails) {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))

  const testScriptName = `test:${problemDetails.problemNumber}-${problemDetails.title.toLowerCase().replace(/\s+/g, '-')}`

  packageJson.scripts[testScriptName] =
    `node --loader ts-node/esm --test tests/${problemDetails.problemNumber}-${problemDetails.title.toLowerCase().replace(/\s+/g, '-')}.test.ts`

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

async function main() {
  const problemUrl = process.argv[2]
  if (!problemUrl) {
    console.error('Please provide a LeetCode problem URL')
    process.exit(1)
  }

  try {
    const problemDetails = await fetchLeetCodeProblem(problemUrl)

    // Generate file names
    const problemFileName = `${problemDetails.problemNumber}-${problemDetails.title.toLowerCase().replace(/\s+/g, '-')}.ts`
    const testFileName = `${problemDetails.problemNumber}-${problemDetails.title.toLowerCase().replace(/\s+/g, '-')}.test.ts`

    // Create src and tests directories if they don't exist
    await fs.mkdir(path.join(process.cwd(), 'src'), { recursive: true })
    await fs.mkdir(path.join(process.cwd(), 'tests'), { recursive: true })

    // Write problem file
    const problemFilePath = path.join(process.cwd(), 'src', problemFileName)
    await fs.writeFile(
      problemFilePath,
      await prettier.format(generateProblemFile(problemDetails), {
        parser: 'typescript',
      })
    )

    // Write test file
    const testFilePath = path.join(process.cwd(), 'tests', testFileName)
    await fs.writeFile(
      testFilePath,
      await prettier.format(generateTestFile(problemDetails), {
        parser: 'typescript',
      })
    )

    // Update package.json
    await updatePackageJson(problemDetails)

    console.log(`Created problem file: ${problemFileName}`)
    console.log(`Created test file: ${testFileName}`)
    console.log('Updated package.json with new test script')
  } catch (error) {
    console.error('Failed to download LeetCode problem:', error)
    process.exit(1)
  }
}

main()
