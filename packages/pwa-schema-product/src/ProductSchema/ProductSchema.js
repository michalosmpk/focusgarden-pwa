import React from 'react';
import { useQuery } from '@apollo/client';

import { useLocation } from 'react-router-dom';

import productQueries from '@magento/peregrine/lib/talons/RootComponents/Product/product.gql';

const getImage = (productData) => {
  if (productData?.small_image?.url) {
    return productData.small_image.url;
  }
  const mainImage = mediaGalleryEntries?.find(entry => entry.label === 'Main');
  if (mainImage) {
    return mainImage.file;
  }

  return productData.media_gallery_entries?.[0]?.file || '';
}

const ProductSchema = () => {
  const { pathname } = useLocation();
  const {
    getProductDetailQuery,
    getStoreConfigData
  } = productQueries;

  const { data: storeConfigData, loading: storeConfigLoading } = useQuery(
    getStoreConfigData
  );

  const slug = pathname.split('/').pop();
  const productUrlSuffix = storeConfigData?.storeConfig?.product_url_suffix;
  const urlKey = productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug;

  const { data: product, loading: productLoading } = useQuery(
    getProductDetailQuery,
    {
      skip: !storeConfigData,
      variables: {
        urlKey
      }
    }
  );

  const productData = product?.products?.items?.[0];
  if (!productData) return null;

  const { name, sku, stock_status, url_key } = productData;

  const description = productData.description?.html || '';
  const priceAmount = productData.price?.regularPrice?.amount;
  const price = priceAmount?.value;
  const priceCurrency = priceAmount?.currency;
  const image = getImage(productData);
  const imageUrl = image ? `${window.location.origin}/media/catalog/product${image}` : '';

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    sku,
    description,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: stock_status === 'IN_STOCK'
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${window.location.origin}/${url_key}${productUrlSuffix || ''}`,
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
};

export default ProductSchema;
