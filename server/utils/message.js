var generate_message = (from, text) =>{
    return {
        from,
        text,
        created_at: new Date().getTime()
    }
};

var generate_location_message = (from, latitude, longitude) =>{
    return {
        from,
        url: `https://www.google.co.ke/maps?q=${latitude},${longitude}`,
        created_at: new Date().getTime()
    }
};

module.exports = {generate_message, generate_location_message};