export default class Collections {
  constructor(client) {
    this.client = client;
  }

  // 유저의 컬렉션 불러오기
  async getCollections(accessToken) {
    const res = await this.client.get('/collections', {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return res.data;
  }
}
