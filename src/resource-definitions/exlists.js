import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/ex-lists/CvCreate.vue';
import CvEdit from 'components/resources/ex-lists/CvEdit.vue';
import CvIndex from 'components/resources/ex-lists/CvIndex.vue';
import CvShow from 'components/resources/ex-lists/CvShow.vue';
import ListService from 'services/ExList';

let resourceName = "ex-lists";

export default function(globals){

	let resource = new CvResourceMap({
		name             : resourceName,
		rowsLabel        : "Listas",
		rowLabel         : "Lista",
		icon             : "list",
		path             : resourceName,
		getSuccessMessage: "",
		getErrorMessage  : "No se ha encontrado el recurso",
		setSuccessMessage: "",
		setErrorMessage  : "",
		setCancelMessage : "Acción cancelada",
		crudServices     : new ListService(globals["cvComunicator"],resourceName),
		nextLabel        : "Guardar",
		backLabel        : "Cancelar",
	});
	resource.setActions([
		{
			name      : "index",
			label     : "Listas",
			icon      : "",
			getService: resource.crudServices.index,
			resource  : resource,
			path      : resource.path+"",
			component : CvIndex,
			type      : "rows",
		},
		{
			name              : "create",
			label             : "Crear lista",
			icon              : "",
			setSuccessMessage : "Lista creado",
			setErrorMessage   : "Error al intentar crear la lista",
			setCancelMessage  : "Se ha cancelado la creación de la lista",
			setService        : resource.crudServices.store,
			resource          : resource,
			path              : resource.path+"/create",
			component         : CvCreate,
		},
		{
			name         : "show",
			label        : "Lista",
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
			label             : "Editar lista",
			icon              : "",
			setSuccessMessage : "Se ha editado correctamente la lista",
			setErrorMessage   : "Error al intentar editar la lista",
			setCancelMessage  : "Se ha cancelado la edición de la lista",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.update,
			resource          : resource,
			path              : resource.path+"/:id/edit",
			urlParams         : ["id"],
			component         : CvEdit,
		},
		{
			name              : "delete",
			label             : "Eliminar lista",
			icon              : "",
			setSuccessMessage : "Lista eliminado",
			setErrorMessage   : "Error al intentar eliminar la lista",
			setCancelMessage  : "Se ha cancelado la eliminación de la lista",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.destroy,
			resource          : resource,
			path              : resource.path+"/:id/delete",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "activate",
			label             : "Activar lista",
			icon              : "",
			setSuccessMessage : "Se ha activado correctamente la lista",
			setErrorMessage   : "Error al intentar activar la lista",
			setCancelMessage  : "Se ha cancelado la activación de la lista",
			setService        : resource.crudServices.activate,
			resource          : resource,
			path              : resource.path+"/:id/activate",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "deactivate",
			label             : "Desactivar lista",
			icon              : "",
			setSuccessMessage : "Se ha desactivado correctamente la lista",
			setErrorMessage   : "Error al intentar activar la lista",
			setCancelMessage  : "Se ha cancelado la desactivación de la lista",
			setService        : resource.crudServices.deactivate,
			resource          : resource,
			path              : resource.path+"/:id/deactivate",
			urlParams         : ["id"],
			component         : null,
		}
	]);
	return resource;
}