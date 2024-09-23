import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class AdsService {

  async getAds() {
    const response = await api.get(`api/ads`)
    logger.log('Got Ads', response.data)

  }

}
export const adsService = new AdsService