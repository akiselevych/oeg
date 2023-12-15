//libs
import { FC, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
//components
import ImgUpload from "components/ImgUpload/ImgUpload";
//redux
import { createInventory, changeInventory, setErrorMessageToNull } from "reduxFolder/slices/InventorySlice";
import { fetchSuppliersMaterials } from "reduxFolder/slices/SuppliersSlice";
import { createInventoryFormSelector } from "reduxFolder/selectors";
import { setEditInventory } from "reduxFolder/slices/PagesStateSlice";
//types
import { AppDispatch, RootStateType, BackEndInventoryType } from "types/index"
//styles
import { Container, Form, Select, Input, SubmitButton } from "./styles"

const CreateInventoryForm: FC<{ isOpen: boolean; close: () => void }> = ({ isOpen, close }) => {
  const dispatch = useDispatch<AppDispatch>()
  const editInventory = useSelector(createInventoryFormSelector)
  const suppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersMaterials)
  const createInventoryLoadingStatus = useSelector((state: RootStateType) => state.Inventory.createInventoryLoadingStatus)
  const changeInventoryLoadingStatus = useSelector((state: RootStateType) => state.Inventory.changeInventoryLoadingStatus)
  const errorMessage = useSelector((state: RootStateType) => state.Inventory.errorMessage)


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false)
  // @ts-ignore
  const onSubmit = (data) => {
    const { name, description, article, supplier, available, reserved, units, order, image } = data
    const newInventory: BackEndInventoryType = {
      name,
      description,
      supplier_id: supplier,
      units,
      reserved_count: reserved,
      ordered_count: order,
      available_count: available,
      article_number: article,
      is_active: true
    }

    const formData = new FormData()
    if (image) {
      formData.set('image', image)
    }

    if (editInventory) {
      dispatch(changeInventory({
        data: newInventory,
        id: editInventory.id,
        image: image && typeof image !== "string" ? formData : image
      }))
    } else {
      dispatch(createInventory({
        data: newInventory,
        image: image ? formData : null
      }))
    }
    setWasSubmited(true)

  }



  useEffect(() => {
    if (!suppliers.length) dispatch(fetchSuppliersMaterials())

    return () => {
      dispatch(setEditInventory(null))
      reset()
    }
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (createInventoryLoadingStatus === "idle" && changeInventoryLoadingStatus === 'idle' && wasSubmited && !errorMessage) {
      dispatch(setEditInventory(null))
      setWasSubmited(false)
      reset()
      close()
      dispatch(setErrorMessageToNull())
      window.location.hash = ""
    }
    //eslint-disable-next-line
  }, [createInventoryLoadingStatus, changeInventoryLoadingStatus])


  useEffect(() => {
    if (editInventory) {
      reset({
        name: editInventory?.name,
        description: editInventory?.description,
        article: editInventory?.article,
        supplier: suppliers.find(item => item.id === editInventory?.supplierId)?.id,
        available: editInventory?.available,
        reserved: editInventory?.reserved,
        units: editInventory?.units,
        order: editInventory?.ordered
      })
    }
    // eslint-disable-next-line
  }, [editInventory, suppliers])

  console.log(errors)

  return (
    <Container style={{ display: isOpen ? "block" : "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
          <p>Materialname</p>
          <Input {...register("name", { required: true })} style={{ width: '180px' }} placeholder='Material eingeben' type='text' />
        </div>
        <div className="inputWrapper">
          <p>Beschreibung</p>
          <Input {...register("description")} style={{ width: '180px' }} placeholder='Beschreibung' type='text' />
        </div>
        <div className="inputWrapper">
          <p>Artikel</p>
          <Input {...register("article", { required: true })} style={{ width: '88px' }} placeholder='Article' type='text' />

        </div>
        <div className="inputWrapper">
          <p>Lieferant</p>
          <Select {...register("supplier", { required: true })} style={{ width: '165px' }} defaultValue={suppliers.length > 0 ? suppliers[0].id : ""}>
            {suppliers.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </Select>
        </div>
        <div className="inputWrapper">
          <p>Verfügbar</p>
          <Input step={0.1} {...register("available", { required: true })} style={{ width: '96px' }} placeholder='0' type="number" />
        </div>
        <div className="inputWrapper">
          <p>Reserviert</p>
          <Input step={0.1} {...register("reserved", { required: true })} style={{ width: '96px' }} placeholder='0' type='number' />
        </div>
        <div className="inputWrapper">
          <p>Einheiten</p>
          <Select {...register("units", { required: true })} style={{ width: '165px' }} defaultValue="kg">
            <option value="kg">Kilogram</option>
            <option value="g">Gram</option>
            <option value="l">Liter</option>
            <option value="m">Meter</option>
            <option value="cm">Centimeter</option>
            <option value="stück">Stück</option>
            <option value="kWp">kWp</option>
            <option value="pauschal">Pauschal</option>
            <option value="stunden">Stunden</option>
          </Select>
        </div>
        <div className="inputWrapper">
          <p>Bestellt</p>
          <Input step={0.1} {...register("order", { required: true })} style={{ width: '105px' }} placeholder='order' type='number' />
        </div>
        <Controller
          name="image"
          control={control}
          defaultValue={editInventory?.photo || ''}
          render={({ field }) => (
            <>
              <ImgUpload
                size={100}
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    field.onChange(file);
                  }
                }}
                src={field.value instanceof Blob ? URL.createObjectURL(field.value) : (editInventory?.photo || '')}
              />
            </>
          )}
        />
        <SubmitButton style={{ width: '105px' }} $disabled={(Object.keys(errors).length > 0)} type="submit" value={'Hinzufügen'} disabled={!isValid || Object.keys(errors).length > 0} />
      </Form>
      <div className="errorsBlock">
        {errors[`name`] && <span style={{ color: 'red' }}>Name Feld ist erforderlich</span>}
        {errors[`article`] && <span style={{ color: 'red' }}>Artikel Feld ist erforderlich</span>}
        {errors[`supplier`] && <span style={{ color: 'red' }}>Lieferant Feld ist erforderlich</span>}
        {errors[`address`] && <span style={{ color: 'red' }}>Adresse Feld ist erforderlich</span>}
        {errors[`available`] && <span style={{ color: 'red' }}>Verfügbar Feld ist erforderlich</span>}
        {errors[`reserved`] && <span style={{ color: 'red' }}>Reserviert Feld ist erforderlich</span>}
        {errors[`units`] && <span style={{ color: 'red' }}>Einheiten Feld ist erforderlich</span>}
        {errors[`order`] && <span style={{ color: 'red' }}>Bestell Feld ist erforderlich</span>}
        {createInventoryLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas ist schief gelaufen, versuchen Sie es erneut oder später</span>}
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </div>
    </Container >
  )
}

export default CreateInventoryForm