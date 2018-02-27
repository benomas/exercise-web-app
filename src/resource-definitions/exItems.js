import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/ex-items/CvCreate.vue';
import CvEdit from 'components/resources/ex-items/CvEdit.vue';
import CvIndex from 'components/resources/ex-items/CvIndex.vue';
import CvShow from 'components/resources/ex-items/CvShow.vue';
import ItemService from 'services/ExItem';

let resourceName = "ex-items";
let resourcePrefix = "ex-lists/:exList";

export default function(globals){

	let resource = new CvResourceMap({
		name              : resourceName,
		rowsLabel         : "Items",
		rowLabel          : "Item",
		icon              : "people",
		path              : resourcePrefix+"/"+resourceName,
		getSuccessMessage : "",
		getErrorMessage   : "No se ha encontrado el recurso",
		setSuccessMessage : "",
		setErrorMessage   : "",
		setCancelMessage  : "Acción cancelada",
		crudServices      : new ItemService(globals["cvComunicator"],resourceName),
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
			label      : "Item",
			icon       : "",
			getService : resource.crudServices.show,
			resource   : resource,
			path       : resource.path+"/:id/show",
			urlParams  : ["id"],
			component  : CvShow,
		},
		{
			name              : "create",
			label             : "Crear item",
			icon              : "",
			setSuccessMessage : "Item creado",
			setErrorMessage   : "Error al intentar crear el item",
			setCancelMessage  : "Se ha cancelado la creación del item",
			setService        : resource.crudServices.store,
			resource          : resource,
			path              : resource.path+"/create",
			component         : CvCreate,
		},
		{
			name              : "edit",
			label             : "Editar item",
			icon              : "",
			setSuccessMessage : "Se ha editado correctamente el item",
			setErrorMessage   : "Error al intentar editar el item",
			setCancelMessage  : "Se ha cancelado la edición del item",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.update,
			resource          : resource,
			path              : resource.path+"/:id/edit",
			urlParams         : ["id"],
			component         : CvEdit,
		},
		{
			name              : "delete",
			label             : "Eliminar item",
			icon              : "",
			setSuccessMessage : "Item eliminado",
			setErrorMessage   : "Error al intentar eliminar el item",
			setCancelMessage  : "Se ha cancelado la eliminación del item",
			getService        : resource.crudServices.show,
			setService        : resource.crudServices.destroy,
			resource          : resource,
			path              : resource.path+"/:id/delete",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "activate",
			label             : "Activar item",
			icon              : "",
			setSuccessMessage : "Se ha activado correctamente el item",
			setErrorMessage   : "Error al intentar activar el item",
			setCancelMessage  : "Se ha cancelado la activación del item",
			setService        : resource.crudServices.activate,
			resource          : resource,
			path              : resource.path+"/:id/activate",
			urlParams         : ["id"],
			component         : null,
		},
		{
			name              : "deactivate",
			label             : "Desactivar item",
			icon              : "",
			setSuccessMessage : "Se ha desactivado correctamente el item",
			setErrorMessage   : "Error al intentar activar el item",
			setCancelMessage  : "Se ha cancelado la desactivación del item",
			setService        : resource.crudServices.deactivate,
			resource          : resource,
			path              : resource.path+"/:id/deactivate",
			urlParams         : ["id"],
			component         : null,
		}
	]);
	return resource;
}