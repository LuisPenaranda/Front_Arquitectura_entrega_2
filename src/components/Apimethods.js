var url_sub2 = "http://25.7.34.144:7277/api"//api/login

//Productos
module.exports.GET_PRODUCTOS_ALL = url_sub2 + `/Products/GetAll`;

//Ordenes
module.exports.GET_ORDEN_ALL = url_sub2 + `/Orders/GetAll`;
module.exports.GET_ORDEN_ID = url_sub2 + `/Orders/GetById/`;//Agregar el id para buscar
module.exports.POST_ORDEN = url_sub2 + `/Orders/Add`;

//Usuario
module.exports.GET_USUARIO_ID = url_sub2 + `/Users/GetById/`;//Agregar el id para buscar
module.exports.POST_USUARIO = url_sub2 + `/Users/Add`;
module.exports.PUT_USUARIO = url_sub2 + `/Users/Update`;
module.exports.PUT_USUARIO = url_sub2 + `/Users/Delete?id=`;//Agregar el id para eliminar

const delete_preference_by_user = (userID, preferenceID) => {
    return url_sub2 + `/Users/DeletePreference?idUser=`+ userID + `&idPreference=` + preferenceID;
}
module.exports.DELETE_PREFERENCIA_DE_USUARIO = delete_preference_by_user;

//Preferencias
module.exports.GET_PREFERENCE_ID = url_sub2 + `/Preferences/GetById/`;//Agregar el id para buscar
module.exports.GET_PREFERENCIAS = url_sub2 + `/Preferences/GetAll`;
module.exports.POST_USUARIO = url_sub2 + `/Users/Update`;
module.exports.PUT_USUARIO = url_sub2 + `/Users/Update`;
module.exports.PUT_USUARIO = url_sub2 + `/Users/Update`;