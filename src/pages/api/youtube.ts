import axios from "axios";

export default class Youtube {
  // 클래스 생성자 함수
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: {
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  // async detailData(detailId) {
  //   return this.httpClient
  //     .get("videos", {
  //       params: {
  //         id: detailId,
  //         part: "snippet",
  //       },
  //     })
  //     .then((res) => res.data.items);
  // }

  async detailData(detailId) {
    const videoData = await this.httpClient
      .get("videos", {
        params: {
          id: detailId,
          part: "snippet",
        },
      })
      .then((res) => res.data.items);

    const channelId = videoData[0].snippet.channelId;

    const channelData = await this.httpClient
      .get("channels", {
        params: {
          id: channelId,
          part: "snippet",
        },
      })
      .then((res) => res.data.items);

    return {
      videoData: videoData[0],
      channelData: channelData[0],
    };
  }

  async relatedVideo(detailId) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          type: "video",
          relatedToVideoId: detailId,
        },
      })
      .then((res) => res.data.items);
  }

  async #mostPopular() {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
