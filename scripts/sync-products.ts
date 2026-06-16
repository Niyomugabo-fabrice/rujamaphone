// // scripts/sync-products.ts

// import prisma from "@/lib/prisma";
// import { productsIndex } from "@/lib/meilisearch";

// async function sync() {
//   const products = await prisma.product.findMany({
//     where: {
//       deletedAt: null,
//     },
//   });

//   await productsIndex.addDocuments(products);

//   console.log(`Indexed ${products.length} products`);
// }

// sync()
//   .then(() => process.exit(0))
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });