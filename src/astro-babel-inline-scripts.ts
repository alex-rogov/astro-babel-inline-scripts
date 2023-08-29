import type { AstroIntegration } from 'astro'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import babel, { type TransformOptions } from '@babel/core'

export default (options: TransformOptions = {}): AstroIntegration => {
  return {
    name: 'babel-inline-scripts',
    hooks: {
      'astro:build:done': ({ routes, dir }) => {
        const scriptTagRegex = /<script.*?>([\s\S]*?)<\/script>/gim

        const stripScriptTags = (htmlString: string) => htmlString.replace(scriptTagRegex, '$1')

        const HTMLPaths = routes.map(({ distURL }) => distURL?.pathname).filter(Boolean) as Array<string>

        const dirName = path.basename(dir.pathname)

        HTMLPaths.forEach((HTMLPath) => {
          const HTMLPathRelative = path.resolve(dirName + HTMLPath.split(dirName)[1])

          const byteContent = readFileSync(HTMLPathRelative)
          const stringContent = String(byteContent)

          const scriptBodies: Array<string> = []
          const transpiledScriptBodies: Array<string> = []
          let replacedStringContent = stringContent

          replacedStringContent.match(scriptTagRegex)?.forEach((script) => {
            const scriptBody = stripScriptTags(script)
            scriptBodies.push(scriptBody)

            const transpiledResult = babel.transform(scriptBody, options)
            const transpiledScript = transpiledResult?.code

            if (transpiledScript) {
              transpiledScriptBodies.push(transpiledScript)
            }
          })

          transpiledScriptBodies.forEach((transpiledScriptBody, index) => {
            replacedStringContent = replacedStringContent.replace(scriptBodies[index], transpiledScriptBody)
          })

          const replacedByteContent = Buffer.from(replacedStringContent)

          writeFileSync(HTMLPathRelative, replacedByteContent)
        })
      },
    },
  }
}
