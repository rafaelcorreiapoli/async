const products = {
  a: {
    name: 'a',
    subproducts: ['b', 'c']
  },
  b: {
    name: 'b',
    subproducts: ['d']
  },
  c: {
    name: 'c',
    subproducts: []
  },
  d: {
    name: 'd',
    subproducts: []
  }
}

/**
{
  subproducts: [
    {
      subproducts: [
        d: {
          subproducts: {}
        }
      ]
    },
    {
      subproducts: []
    }
  ]
}


 */

const getProduct = (product) => new Promise((resolve, reject) => {
  console.log('getting product ', product)
  setTimeout(() => {
    resolve(products[product])
  }, 3000)
})


async function getProductTree({ root }) {

  async function buildTreeLevel(productName) {
    const product = await getProduct(productName)
    const subproducts = product.subproducts

    if (subproducts) {
      const promises = subproducts.map(async subproduct => await buildTreeLevel(subproduct))
      product.subproducts = await Promise.all(promises)
    }

    return product
  }

  try {
    const tree = await buildTreeLevel(root)
    console.log(JSON.stringify(tree))
  } catch (err) {
    console.log(err)
  }
}
setInterval(() => console.log('vivo'), 1000)
getProductTree({root: 'a'})
