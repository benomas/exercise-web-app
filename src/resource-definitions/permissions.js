import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/permissions/CvCreate.vue';
import CvEdit from 'components/resources/permissions/CvEdit.vue';
import CvIndex from 'components/resources/permissions/CvIndex.vue';
import CvShow from 'components/resources/permissions/CvShow.vue';
import PermissionService from 'services/Permission';

let resourceName = "permissions";

export default function(globals){

	let resource = new CvResourceMap({
		name             : resourceName,
		rowsLabel        : "Permisos",
		rowLabel         : "Permiso",
		icon             : "https",
		path             : resourceName,
		getSuccessMessage: "",
		getErrorMessage  : "No se ha encontrado el recurso",
		setSuccessMessage: "",
		setErrorMessage  : "",
		setCancelMessage : "Acción cancelada",
		crudServices     : new PermissionService(globals["cvComunicator"],resourceName),
		nextLabel        : "Guardar",
		backLabel        : "Cancelar",
	});
	resource.setActions([
		{
			name      : "index",
			label     : "Permisos",
			icon      : "",
			getService: resource.crudServices.index,
			resource  : resource,
			path      : resource.path+"",
			component : CvIndex,
			type      : "rows",
		},
		{
			name              : "create",
			label             : "Crear permiso",
			icon              : "",
			setSuccessMessage : "Permiso creado",
			setErrorMessage   : "Error al intentar crear el permiso",
			setCancelMessage  : "Se ha cancelado la creación del permiso",
			setService        : resource.crudServices.store,
			resource          : resource,
			path              : resource.path+"/create",
			component         : CvCreate,
		},
		{
			name         : "show",
			label        : "Permiso",
			icon         : "",
			getService   : resource.crudServices.show,
			resource     : resource,
			path         : resource.path+"/:id",
			urlParams    : ["id"],
			component    : CvShow,
			disableFields: true,
			backLabel    : "Regresar",
			nextLabel    : null,
			isParentRoute: true,
		},
		{
			name              : "edit",
			label             : "Editar permiso",
			icon              : "",
			setSuccessMessage : "Se ha editado correctamente el permiso",
			setErrorMessage   : "Error al intentar editar el permiso",
			setCancelMessage  : "Se ha cancelado la edición del permiso",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.update,
			resource          : resource,
			path              : resource.path+"/:id/edit",
			urlParams         : ["id"],
			component         : CvEdit,
		},
		{
			name              : "delete",
			label             : "Eliminar permiso",
			icon              : "",
			setSuccessMessage : "Permiso eliminado",
			setErrorMessage   : "Error al intentar eliminar el permiso",
			setCancelMessage  : "Se ha cancelado la eliminación del permiso",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.destroy,
			resource          : resource,
			path              : resource.path+"/:id/delete",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "activate",
			label             : "Activar permiso",
			icon              : "",
			setSuccessMessage : "Se ha activado correctamente el permiso",
			setErrorMessage   : "Error al intentar activar el permiso",
			setCancelMessage  : "Se ha cancelado la activación del permiso",
			setService        : resource.crudServices.activate,
			resource          : resource,
			path              : resource.path+"/:id/activate",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "deactivate",
			label             : "Desactivar permiso",
			icon              : "",
			setSuccessMessage : "Se ha desactivado correctamente el permiso",
			setErrorMessage   : "Error al intentar activar el permiso",
			setCancelMessage  : "Se ha cancelado la desactivación del permiso",
			setService        : resource.crudServices.deactivate,
			resource          : resource,
			path              : resource.path+"/:id/deactivate",
			urlParams         : ["id"],
			component         : null,
		}
	]);
	return resource;
}