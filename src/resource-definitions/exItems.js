import CvResourceMap from 'crudvuel/customs/resource/CvResourceMap';
import CvCreate from 'components/resources/ex-items/CvCreate.vue';
import CvEdit from 'components/resources/ex-items/CvEdit.vue';
import CvIndex from 'components/resources/ex-items/CvIndex.vue';
import CvShow from 'components/resources/ex-items/CvShow.vue';
import ItemService from 'services/ExItem';

let resourceName = "ex-items";

export default function(globals){

	let resource = new CvResourceMap({
		name             : resourceName,
		rowsLabel        : "Items",
		rowLabel         : "Item",
		icon             : "people",
		path             : resourceName,
		getSuccessMessage: "",
		getErrorMessage  : "No se ha encontrado el recurso",
		setSuccessMessage: "",
		setErrorMessage  : "",
		setCancelMessage : "Acción cancelada",
		crudServices     : new ItemService(globals["cvComunicator"],resourceName),
		nextLabel        : "Guardar",
		backLabel        : "Cancelar",
	});
	resource.setActions([
		{
			name      : "index",
			label     : "Items",
			icon      : "",
			getService: resource.crudServices.index,
			resource  : resource,
			path      : resource.path+"",
			component : CvIndex,
			type      : "rows",
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
			name         : "show",
			label        : "Item",
			icon         : "",
			getService   : resource.crudServices.show,
			resource     : resource,
			path         : resource.path+"/:item",
			urlParams    : ["item"],
			component    : CvShow,
			disableFields: true,
			backLabel    : "Regresar",
			nextLabel    : null,
			isParentRoute: true,
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
			path              : resource.path+"/:item/edit",
			urlParams         : ["item"],
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
			path              : resource.path+"/:item/delete",
			urlParams         : ["item"],
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
			path              : resource.path+"/:item/activate",
			urlParams         : ["item"],
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
			path              : resource.path+"/:item/deactivate",
			urlParams         : ["item"],
			component         : null,
		}
	]);
	return resource;
}