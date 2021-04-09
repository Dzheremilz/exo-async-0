const axios = require('axios')
const fsPromises = require('fs/promises')

if (process.argv.length !== 3) {
  console.log('Usage: node my-wget.js \'url\'')
  process.exit(1)
}

const wget = async (url) => {
  try {
    const html = await axios.get(url)
    console.log(html.headers)
    if (html.status === 200) { // http code 200: success
      await fsPromises.writeFile('index.html', html.data)
      let size = html.headers['content-length'] ?? (await fsPromises.stat('index.html')).size
      console.log(`Success, index.html has been created, size : ${size} bytes`)
    }
  } catch (e) {
    console.log(e.message)
  }
}

wget(process.argv[2])