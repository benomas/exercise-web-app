import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/roles/CvCreate.vue';
import CvEdit from 'components/resources/roles/CvEdit.vue';
import CvIndex from 'components/resources/roles/CvIndex.vue';
import CvShow from 'components/resources/roles/CvShow.vue';
import RoleService from 'services/Role';

let resourceName = "roles";

export default function(globals){

	let resource = new CvResourceMap({
		name              : resourceName,
		rowsLabel         : "Roles",
		rowLabel          : "Rol",
		icon              : "people",
		path              : "/"+resourceName,
		getSuccessMessage : "",
		getErrorMessage   : "No se ha encontrado el recurso",
		setSuccessMessage : "",
		setErrorMessage   : "",
		setCancelMessage  : "Acción cancelada",
		crudServices      : new RoleService(globals["cvComunicator"],resourceName),
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
			label      : "Rol",
			icon       : "",
			getService : resource.crudServices.show,
			resource   : resource,
			path       : resource.path+"/:id/show",
			urlParams  : ["id"],
			component  : CvShow,
		},
		{
			name              : "create",
			label             : "Crear rol",
			icon              : "",
			setSuccessMessage : "Rol creado",
			setErrorMessage   : "Error al intentar crear el rol",
			setCancelMessage  : "Se ha cancelado la creación del rol",
			setService        : resource.crudServices.store,
			resource          : resource,
			path              : resource.path+"/create",
			component         : CvCreate,
		},
		{
			name              : "edit",
			label             : "Editar rol",
			icon              : "",
			setSuccessMessage : "Se ha editado correctamente el rol",
			setErrorMessage   : "Error al intentar editar el rol",
			setCancelMessage  : "Se ha cancelado la edición del rol",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.update,
			resource          : resource,
			path              : resource.path+"/:id/edit",
			urlParams         : ["id"],
			component         : CvEdit,
		},
		{
			name              : "delete",
			label             : "Eliminar rol",
			icon              : "",
			setSuccessMessage : "Rol eliminado",
			setErrorMessage   : "Error al intentar eliminar el rol",
			setCancelMessage  : "Se ha cancelado la eliminación del rol",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.destroy,
			resource          : resource,
			path              : resource.path+"/:id/delete",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "activate",
			label             : "Activar rol",
			icon              : "",
			setSuccessMessage : "Se ha activado correctamente el rol",
			setErrorMessage   : "Error al intentar activar el rol",
			setCancelMessage  : "Se ha cancelado la activación del rol",
			setService        : resource.crudServices.activate,
			resource          : resource,
			path              : resource.path+"/:id/activate",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "deactivate",
			label             : "Desactivar rol",
			icon              : "",
			setSuccessMessage : "Se ha desactivado correctamente el rol",
			setErrorMessage   : "Error al intentar activar el rol",
			setCancelMessage  : "Se ha cancelado la desactivación del rol",
			setService        : resource.crudServices.deactivate,
			resource          : resource,
			path              : resource.path+"/:id/deactivate",
			urlParams         : ["id"],
			component         : null,
		}
	]);
	return resource;
}