class UsersController {
  async get(req, res) {
    return res.json([{ name: 'John Joe' }]);
  }
}

export default new UsersController();