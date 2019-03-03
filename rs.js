script('client').run(
  'parcel packages/client/src/index.html --port 3000 --no-hmr'
)

script('server').run(
  'cd packages/server/ && nodemon -x ts-node -e ts,json src/index.ts'
)

script('build')
  .run('parcel build packages/client/src/index.html -d out/client')
  .run(
    'parcel build packages/server/src/index.ts -d out/server --target node --bundle-node-modules'
  )
