var generate_message = (from, text) =>{
    return {
        from,
        text,
        created_at: new Date().getTime()
    }
};

module.exports = {generate_message};