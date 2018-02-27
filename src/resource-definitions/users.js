import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/users/CvCreate.vue';
import CvEdit from 'components/resources/users/CvEdit.vue';
import CvIndex from 'components/resources/users/CvIndex.vue';
import CvShow from 'components/resources/users/CvShow.vue';
import UserService from 'services/User';

let resourceName = "users";

export default function(globals){

	let resource = new CvResourceMap({
		name              : resourceName,
		rowsLabel         : "Usuarios",
		rowLabel          : "Usuario",
		icon              : "people",
		path              : "/"+resourceName,
		getSuccessMessage : "",
		getErrorMessage   : "No se ha encontrado el recurso",
		setSuccessMessage : "",
		setErrorMessage   : "",
		setCancelMessage  : "Acción cancelada",
		crudServices      : new UserService(globals["cvComunicator"],resourceName),
	});
	resource.setActions([
		{
			name      : "index",
			label     : "Listado",
			icon      : "",
			getService: resource.crudServices.index,
			resource  : resource,
			path      : resource.path+"",
			component : CvIndex,
			type      : "rows",
		},
		{
			name       : "show",
			label      : "Usuario",
			icon       : "",
			getService : resource.crudServices.show,
			resource   : resource,
			path       : resource.path+"/:id/show",
			urlParams  : ["id"],
			component  : CvShow,
		},
		{
			name              : "create",
			label             : "Crear usuario",
			icon              : "",
			setSuccessMessage : "Usuario creado",
			setErrorMessage   : "Error al intentar crear el usuario",
			setCancelMessage  : "Se ha cancelado la creación del usuario",
			setService        : resource.crudServices.store,
			resource          : resource,
			path              : resource.path+"/create",
			component         : CvCreate,
		},
		{
			name              : "edit",
			label             : "Editar usuario",
			icon              : "",
			setSuccessMessage : "Se ha editado correctamente el usuario",
			setErrorMessage   : "Error al intentar editar el usuario",
			setCancelMessage  : "Se ha cancelado la edición del usuario",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.update,
			resource          : resource,
			path              : resource.path+"/:id/edit",
			urlParams         : ["id"],
			component         : CvEdit,
		},
		{
			name              : "delete",
			label             : "Eliminar usuario",
			icon              : "",
			setSuccessMessage : "Usuario eliminado",
			setErrorMessage   : "Error al intentar eliminar el usuario",
			setCancelMessage  : "Se ha cancelado la eliminación del usuario",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.destroy,
			resource          : resource,
			path              : resource.path+"/:id/delete",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "activate",
			label             : "Activar usuario",
			icon              : "",
			setSuccessMessage : "Se ha activado correctamente el usuario",
			setErrorMessage   : "Error al intentar activar el usuario",
			setCancelMessage  : "Se ha cancelado la activación del usuario",
			setService        : resource.crudServices.activate,
			resource          : resource,
			path              : resource.path+"/:id/activate",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "deactivate",
			label             : "Desactivar usuario",
			icon              : "",
			setSuccessMessage : "Se ha desactivado correctamente el usuario",
			setErrorMessage   : "Error al intentar activar el usuario",
			setCancelMessage  : "Se ha cancelado la desactivación del usuario",
			setService        : resource.crudServices.deactivate,
			resource          : resource,
			path              : resource.path+"/:id/deactivate",
			urlParams         : ["id"],
			component         : null,
		}
	]);
	return resource;
}