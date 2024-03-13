

export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenLifespan: string
  ) {
  }

  get token() {
    const expirationDate = new Date(new Date().getTime() + (+this._tokenLifespan * 60))
    if (new Date() > expirationDate) {
      return null
    }
    return this._token
  }
}
