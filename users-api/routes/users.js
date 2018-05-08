// users-api/users.js
const router = require('express').Router();
const packagejson = require('../package.json');

// respond to get request with users list
router.get('/', (req, res) => {
  res.json({
    public function update($id, Request $request)
{
    $user = User::findOrFail($id);
    $newPassword = $request->get('password');

    if(empty($newPassword)){
        $user->update($request->except('password'));
    }else{
        $user->update($request->all());
    }
    return redirect('users');
}

});

module.exports = router;

