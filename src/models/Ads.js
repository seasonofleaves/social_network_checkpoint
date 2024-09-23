export class Ad {
  constructor(data) {
    this.title = data.title
    this.linkURL = data.linkURL
    this.tall = data.tall
    this.square = data.square
    this.banner = data.banner
  }
}

const data = {
  "title": "Da-planets",
  "linkURL": "boisecodeworks.com",
  "tall": "https://codeworks.blob.core.windows.net/public/assets/ads/TallAdDa-Planets.png",
  "square": "https://codeworks.blob.core.windows.net/public/assets/ads/SquareAdDa-Planets.png",
  "banner": "https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdDa-Planets.png"
}