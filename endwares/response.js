module.exports = {
    handleResponse
  };
  
  
  function handleResponse(req, res) {
  
    // console.log(res.data)
    if(res.data?.err) {
      // handle errors
      res.status(500).json({err: res.data.err})
    } else if(res.data) {
      res.status(res.data.status).json({result: res.data.result});
    } else {
      // handle global 404
      res.sendStatus(404);
    }
  
  }