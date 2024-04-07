const userController = {
    GET: function(req, res){
        try{
            const users = req.getData("users")
            const params = req.params;
            const queries = req.query;
            if(Object.keys(params).length) {
                const idx = users.findIndex(user => user.userId == params.userId);
                if(idx >= 0) return res.status(200).json(users[idx])
                else return res.status(404).json({message: "The user not found", statusCode: 404})
            };
            if(Object.keys(queries).length) {
                const searchUsers = req.searchData(users, queries);
                if(searchUsers.length) return res.json(searchUsers);
                return res.status(404).json({message: "The search params its invalid !", statusCode: 404})
            };
            return res.status(200).json(users)
        }catch(error){
            return res.json({message: error.message})
        }    
    }
}
module.exports = {userController};