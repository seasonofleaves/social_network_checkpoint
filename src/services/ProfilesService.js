import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from "@/models/Account.js"
import { AppState } from "@/AppState.js"

class ProfilesService {
  async getProfileById(profileId) {
    //NOTE - clears ghost data out of AppState
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('Got profile - profiles service', response.data)
    const newProfile = new Account(response.data)
    AppState.activeProfile = newProfile
  }

}
export const profilesService = new ProfilesService()