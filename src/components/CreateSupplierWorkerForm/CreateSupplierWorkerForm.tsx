//libs
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
//redux
import { createLabor } from "reduxFolder/slices/Labors.slice"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, Form, Input, SubmitButton, Select } from "./styles"
import moment from "moment"
import { fetchSuppliersForWorkersByProject } from "reduxFolder/slices/SuppliersSlice"

const CreateSupplierWorkerForm: FC<{ project_id: string | number, isOpen: boolean; close: () => void }> = ({ isOpen, close, project_id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const suppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersWorkersByProject)
  const createLaborLoadingStatus = useSelector((state: RootStateType) => state.Labors.createLaborLoadingStatus)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false)
  // @ts-ignore
  const onSubmit = (data) => {
    const { name, hours, supplier, date } = data
    setWasSubmited(true)
    dispatch(createLabor({ name, date: moment(date, dateFormats).format('YYYY-MM-DD'), hours, supplier_id: supplier, project_id }))
  }

  useEffect(() => {
    if (createLaborLoadingStatus === "idle" && wasSubmited) {
      setWasSubmited(false)
      reset()
      close()
    }
    //eslint-disable-next-line
  }, [createLaborLoadingStatus])

  useEffect(() => {
    if (!suppliers.data.length) dispatch(fetchSuppliersForWorkersByProject(currentProject!.id))
    //eslint-disable-next-line
  }, [])


  const dateFormats = [
    'YYYY-MM-DD',
    'DD.MM.YYYY',
    'DD/MM/YYYY',
    "DD-MM-YYYY"
  ];

  const isValidDateFormat = (value: string) => {
    return moment(value, dateFormats).isValid();
  };

  const suppliersWithoutDublicates = suppliers.data.reduce((acc, obj) => {
    if (!acc.some(o => o.id === obj.id)) {
      acc.push(obj);
    }
    return acc;
  }, [] as { company: string; id: string | number; }[]);

  return (
    <Container style={{ display: isOpen ? "block" : "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
          <p>Name</p>
          <Input {...register("name", { required: true })} style={{ width: '180px' }} placeholder='Eingabe des Namens' type='text' />
        </div>
        <div className="inputWrapper">
          <p>Firma</p>
          <Select {...register("supplier", { required: true })} style={{ width: '180px' }}>
            {
              suppliersWithoutDublicates.map(({ company, id }, i) => <option key={i} value={id}>{company}</option>)
            }
          </Select>
        </div>
        <div className="inputWrapper">
          <p>Stunden</p>
          <Input step={0.01} {...register("hours", { required: true })} style={{ width: '150px' }} placeholder='0' type='number' />
        </div>
        <div className="inputWrapper">
          <p>Datum</p>
          <Input {...register("date", { required: true, validate: isValidDateFormat })} style={{ width: '130px' }} placeholder="DD-MM-YYYY" type='text' />
        </div>
        <SubmitButton style={{ width: '105px' }} $disabled={(!isValid || Object.keys(errors).length > 0)} type="submit" value={'Add'} disabled={!isValid || Object.keys(errors).length > 0} />
      </Form>
      <div className="errorsBlock">
        {errors[`name`] && <span style={{ color: 'red' }}>Name field is required</span>}
        {errors[`supplier`] && <span style={{ color: 'red' }}>Article field is required</span>}
        {errors[`totalTime`] && <span style={{ color: 'red' }}>Supplier field is required</span>}
        {createLaborLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
      </div>
    </Container >
  )
}

export default CreateSupplierWorkerForm