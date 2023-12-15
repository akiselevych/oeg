//libs
import {CSSProperties, Dispatch, FC, SetStateAction, useEffect} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
//components
import DatePickerComp from "components/DatePickerComp/DatePickerComp";
//styles
import {
    Container, DatePickerWrapper, Description,
    EventForm,
    FormLabel, HeaderWrapper,
    Input,
    InputWrapper,
    Select, SubmitButton, SubmitButtonWrapper,
    Title
} from "components/EventModal/styles";
//utils 
import {sortBySortTerm} from "utils/sortBySortTerm";
//types
import {AppDispatch, EventFormInputs, RootStateType} from "types/index";
//redux
import {useDispatch, useSelector} from "react-redux";
import {fetchSuppliersWorkers} from "reduxFolder/slices/SuppliersSlice";
import {
    changeEvent,
    createEvent,
    resetCurrentEvent,
    setIsEdit
} from "reduxFolder/slices/EventsSlice";


interface CalendarModalProps {
    setIsModal: Dispatch<SetStateAction<boolean>>;
    insideProject: boolean;
    style?: CSSProperties;
}

const EventModal: FC<CalendarModalProps> = ({setIsModal, insideProject, style}) => {
    const projects = useSelector((state: RootStateType) => state.Projects.projects);
    const suppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersWorkers);
    const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject);
    const employees = useSelector((state: RootStateType) => state.Employees.employees);
    const eventForEdit = useSelector((state: RootStateType) => state.Events.eventByID);
    const isEdit = useSelector((state: RootStateType) => state.Events.isEdit);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        return () => {
            dispatch(resetCurrentEvent())
            dispatch(setIsEdit(false))
        }
                // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(fetchSuppliersWorkers())
                // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (eventForEdit[0] != null) {
            const {
                project, employees,
                suppliers,
                name,
                description,
                start_date,
                end_date,
            } = eventForEdit[0];

            setValue(`project`, `${project.id}`);
            setValue(`name`, name);
            setValue(`description`, description);
            setValue(`startDate`, start_date);
            setValue(`endDate`, end_date);
            suppliers!.map((sup, index) => setValue(`suppliers.${index}`, ({id: sup.id})));
            employees!.map((emp, index) => setValue(`employees.${index}`, ({id: emp.id})));

        }
        // eslint-disable-next-line
    }, [eventForEdit]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {isValid},
        setValue,
        watch
    } = useForm<EventFormInputs>({
        mode: "onChange",
        defaultValues: {
            name: "",
            employees: [
                {id: undefined},
            ],
            project: null,
            startDate: "",
            endDate: "",
            description: "",
            suppliers: [
                {id: undefined}
            ],
            informEmployee: false,
            informSuppliers: false
        }
    });

    useEffect(() => {
        if (insideProject && currentProject != null) {
            setValue(`project`, currentProject.id);
        }
        // eslint-disable-next-line
    }, [currentProject, insideProject, setValue]);


    const onSubmit: SubmitHandler<Partial<EventFormInputs>> = ({
                                                                   description,
                                                                   employees,
                                                                   endDate,
                                                                   informEmployee,
                                                                   informSuppliers,
                                                                   name,
                                                                   project,
                                                                   startDate,
                                                                   suppliers,
                                                               }) => {
        if (isEdit) {
            const event = {
                id: eventForEdit[0].id,
                project_id: project,
                name: name,
                description: description,
                start_date: startDate,
                end_date: endDate,
                employees: employees!.map(emp => Number(emp?.id))[0] === 0 ? [] : employees!.map(emp => Number(emp?.id)),
                suppliers: suppliers!.map(sup => Number(sup?.id))[0] === 0 ? [] : suppliers!.map(sup => Number(sup?.id)),
                informEmployee: informEmployee,
                informSuppliers: informSuppliers,
            }
            // @ts-ignore
            dispatch(changeEvent(event))
            dispatch(resetCurrentEvent())
            dispatch(setIsEdit(false))
        } else {
            const event = {
                project_id: project,
                name: name,
                description: description,
                start_date: startDate,
                end_date: endDate,
                employees: employees!.map(emp => Number(emp?.id))[0] === 0 ? [] : employees!.map(emp => Number(emp?.id)),
                suppliers: suppliers!.map(sup => Number(sup?.id))[0] === 0 ? [] : suppliers!.map(sup => Number(sup?.id)),
            }
            // @ts-ignore
            dispatch(createEvent({event, informEmployee, informSuppliers}));
        }


        reset();
        setIsModal(false);
    }
    const {fields: suppliersArray,remove: removeSuppliers ,append: appendSuppliers} = useFieldArray({
        control,
        name: "suppliers"
    });

    const {fields: employeesArray,remove:removeEmployees, append: appendEmployees} = useFieldArray({
        control,
        name: "employees",
    });

    return (
        <Container style={style}>
            <HeaderWrapper>
                <Title>Event erstellen</Title>
                <div className="container" onClick={() => setIsModal(false)}>
                    <div className="cross-icon"></div>
                </div>
            </HeaderWrapper>
            <EventForm onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Geben Sie den Namen"
                        {...register(`name`, {
                            required: true,
                        })}
                    />
                </InputWrapper>

                <Select
                    disabled={insideProject}
                    {...register(`project`, {
                        required: true,
                    })}
                >
                    <option className="option" value="">Select a project</option>
                    {sortBySortTerm(projects, {name: "inc"}).map((project) => <option className="option"
                                                                                      value={project.id}
                                                                                      key={project.id}>{project.name}</option>)}
                </Select>

                <DatePickerWrapper>
                    <DatePickerComp watch={watch} control={control}/>
                </DatePickerWrapper>

                <InputWrapper>
                    <div className="header">
                        <FormLabel>Auswahl eines Lieferanten</FormLabel>
                        <div className="informBlock">
                            <FormLabel>Informieren</FormLabel>
                            <input
                                disabled={watch(`suppliers.${0}.id`) == null || watch(`suppliers.${0}.id`) === ""}
                                {...register(`informSuppliers`, {
                                    required: false,
                                })} type="checkbox"/>
                        </div>
                    </div>
                    <div className="supplierWrapper">
                        {suppliersArray.map((_, supplierIndex) => (
                            <div className="select-wrapper" key={supplierIndex}>
                                <Controller
                                    key={supplierIndex}
                                    name={`suppliers.${supplierIndex}.id`}
                                    control={control}
                                    rules={{required: watch(`employees.${0}.id`) == null || watch(`employees.${0}.id`) === "" || suppliersArray.length > 1}}
                                    defaultValue={""}
                                    render={({field}) => (
                                        <Select {...field} value={field.value || ''} onChange={field.onChange}>
                                            <option className="option" value="">Auswahl eines Lieferanten</option>
                                            {sortBySortTerm(suppliers, {contactPerson: "inc"}).map((supplier) => <option
                                                className="option"
                                                value={supplier.id}
                                                key={supplier.id}>{supplier.name}</option>)}
                                        </Select>
                                    )}
                                />
                                {supplierIndex === 0
                                    ?
                                    (
                                        <div
                                            className="plus-container"
                                            onClick={() => appendSuppliers({id: null})}
                                        >
                                            <div className="plus-horizontal"></div>
                                            <div className="plus-vertical"></div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div
                                            className="plus-container"
                                            onClick={() => removeSuppliers(supplierIndex)}
                                        >
                                            <div className="plus-horizontal"></div>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </InputWrapper>

                <InputWrapper>
                    <div className="header">
                        <FormLabel>Mitarbeiter auswählen</FormLabel>
                        <div className="informBlock">
                            <FormLabel>Informieren</FormLabel>
                            <input
                                disabled={watch(`employees.${0}.id`) == null || watch(`employees.${0}.id`) === ""}
                                {...register(`informEmployee`, {
                                    required: false,
                                })} type="checkbox"/>
                        </div>
                    </div>
                    <div className="employeeWrapper">
                        {employeesArray.map((_, employeeIndex) => (
                            <div className="select-wrapper" key={employeeIndex}>
                                <Controller
                                    key={employeeIndex}
                                    name={`employees.${employeeIndex}.id`}
                                    rules={{required: watch(`suppliers.${0}.id`) == null || watch(`suppliers.${0}.id`) === "" || employeesArray.length > 1}}
                                    control={control}
                                    defaultValue={""}
                                    render={({field}) => (
                                        <Select {...field} value={field.value || ''} onChange={field.onChange}>
                                            <option className="option" value="">Mitarbeiter auswählen</option>
                                            {sortBySortTerm(employees, {name: "inc"}).map((employee) => <option
                                                className="option"
                                                value={employee.id}
                                                key={employee.id}>{employee.name}</option>)}
                                        </Select>
                                    )}
                                />
                                {employeeIndex === 0
                                    ?
                                    (
                                        <div
                                            className="plus-container"
                                            onClick={() => appendEmployees({id: null})}
                                        >
                                            <div className="plus-horizontal"></div>
                                            <div className="plus-vertical"></div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div
                                            className="plus-container"
                                            onClick={() => removeEmployees(employeeIndex)}
                                        >
                                            <div className="plus-horizontal"></div>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </InputWrapper>

                <InputWrapper>
                    <FormLabel>Beschreibung</FormLabel>
                    <Description
                        placeholder="Geben Sie die Beschreibung"
                        {...register(`description`)}
                    />
                </InputWrapper>
                <SubmitButtonWrapper>
                    <SubmitButton disabled={!isValid} type="submit">{isEdit ? "Bearbeiten" : "Erstellen"}</SubmitButton>
                </SubmitButtonWrapper>
            </EventForm>
        </Container>
    )
}

export default EventModal;
