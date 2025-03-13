import Axios from 'axios';
import { marketplaceResourcesRetrieve, Resource } from 'waldur-js-client';

export async function loadData(url: string) {
  try {
    const response = await Axios.get(url);
    const resource = response.data;
    let marketplaceResource: Resource;
    if (resource.marketplace_resource_uuid) {
      marketplaceResource = await marketplaceResourcesRetrieve({
        path: { uuid: resource.marketplace_resource_uuid },
      }).then((r) => r.data);
    }
    return { resource, marketplaceResource };
  } catch (error) {
    throw new Error(error);
  }
}
