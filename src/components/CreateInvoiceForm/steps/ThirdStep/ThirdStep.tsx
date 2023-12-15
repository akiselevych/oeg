//libs
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch
} from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocation } from "react-router-dom";
//styles
import { Input, Option } from "components/CreateInvoiceForm/styles";
import {
  ChildPositionInputsWrapper,
  FamilyPositionsWrapper,
  Notes,
  NotesWrapper,
  OptionsWrapper,
  ParentPositionInputsWrapper,
  PositionItemsWrapper,
  PositionsWrapper,
  PositionTitlesWrapper,
  RemoveIcon, TitleArea, TitleWrapper,
  TotalCalcWrapper,
  VatSelect
} from "components/CreateInvoiceForm/steps/ThirdStep/styles";
import { SecondaryButton } from "styles/global";
//redux
import {
  changeAdditionalPosition,
  changeAdditionalPositionItem,
  changeAdditionalProposition,
  changePosition,
  changePositionItem,
  changeProposition,
  createAdditionalPosition,
  createAdditionalPositionItem,
  createPosition,
  createPositionItem,
  deleteAdditionalPosition,
  deleteAdditionalPositionItem,
  deletePosition,
  deletePositionItem
} from "reduxFolder/slices/ProjectPropositionSlice";
//hooks
//types
import {
  AppDispatch,
  InvoiceFormInputs,
  ParentInvoiceFormPositionObject,
  PositionItemType,
  RootStateType
} from "types/index";
//images
import { ReactComponent as SelectArrow } from '../../../../assets/icons/selectArrow.svg'


interface ThirdStepProps {
  activeIndex: number,
  register: UseFormRegister<InvoiceFormInputs>,
  watch: UseFormWatch<InvoiceFormInputs>,
  control: Control<InvoiceFormInputs>,
  setValue: UseFormSetValue<InvoiceFormInputs>,
  getValues: UseFormGetValues<InvoiceFormInputs>,
  templateOfPositions?: string[],
  trigger: UseFormTrigger<InvoiceFormInputs>,
  insideProject: boolean,
  reset?: (values?: any) => void,
  isAdditional?: boolean,
}


const ThirdStep: FC<ThirdStepProps> = ({ insideProject, reset, trigger, activeIndex, register, control, watch, setValue, getValues, templateOfPositions, isAdditional }) => {
  const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition)
  const additionalProposition = useSelector((state: RootStateType) => state.ProjectProposition.additionalProposition)
  const positions = useSelector((state: RootStateType) => state.Projects.currentProject?.propositions[0]?.positions)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();

  useEffect(() => {
    if (positions != null && positions.length < 1 && !isAdditional) {
      templateOfPositions?.forEach((position, index) => {
        dispatch(createPosition({ proposition_id: proposition!.id, title: position }))
          .then(resp => {
            dispatch(createPositionItem({ position_id: resp.payload.id, name: "" }));
            handleAddNewPosition({ position: position, index: index });
          })
      });
      return;
    } else if (/\/project\/\d+/.test(location.pathname) && positions && !isAdditional) {
      positions.slice().forEach((position, positionIndex) => {
        if (getValues(`options.positions`).length !== positions.length) {
          handleAddNewPosition({ position: position.title });
        }
        setValue(`options.positions.${positionIndex}.position`, position.title)
        setValue(`options.positions.${positionIndex}.position_items`, position.position_items);
        position.position_items.forEach((item, itemIndex) => {

          if (item.total && item.buying_price && item.client_price) {
            setValue(`options.positions.${positionIndex}.position_items.${itemIndex}.buying_price`, `${handleFormatNumValue(item.buying_price)}`);
            setValue(`options.positions.${positionIndex}.position_items.${itemIndex}.client_price`, `${handleFormatNumValue(item.client_price)}`);
            setValue(`options.positions.${positionIndex}.position_items.${itemIndex}.total`, `${item.total.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`);
          }
        });
      })
      countAllPositionsTotalVAT();
      countAllPositionsPrice();
      countAllPositionsTotalPrice();
    }

    if (proposition && !isAdditional) {
      setValue(`options.notes`, proposition.description);
      setValue(`options.title`, proposition.title);
    }

    // eslint-disable-next-line
  }, [templateOfPositions]);

  useEffect(() => {
    setDataForUpdatePrositionTitleArea(getValues(`options.title`));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!insideProject && getValues(`options.positions.0.position`) !== "Position") {
      if (isAdditional) {
        handleAddNewPosition(({ index: 0 }));
      } else if (proposition && proposition.positions[0].title === "Position") {
        handleAddNewPosition(({ index: 0 }));
      }
    }

    // eslint-disable-next-line
  }, []);

  const { fields: parentPositions, append, remove } = useFieldArray({
    control,
    name: "options.positions",
  });

  const handleAddNewPosition = ({ position = "Position", index, isDispatch = false }: {
    position?: string;
    index?: number;
    isDispatch?: boolean;
  }) => {
    const newPosition: ParentInvoiceFormPositionObject = {
      position: position,
      position_items: [
        {
          name: null,
          amount: null,
          buying_price: null,
          client_price: null,
          vat: null,
          total: null,
        }
      ],
    };

    if (index === 0) {
      // @ts-ignore
      setValue(`options.positions.0.`, newPosition);
      return;
    }

    if (isDispatch) {
      if (proposition && !additionalProposition) {
        dispatch(createPosition({ proposition_id: proposition?.id, title: "Position" }))
          .then(({ payload }) => {
            dispatch(createPositionItem({ position_id: payload?.id, name: "" }));
          })
      }
      if (additionalProposition) {
        dispatch(createAdditionalPosition({ proposition_id: additionalProposition?.id, title: "Position" }))
          .then(({ payload }) => {
            dispatch(createAdditionalPositionItem({ position_id: payload?.id, name: "" }));
          })
      }
    }

    append(newPosition);
  };

  const handleRemovePosition = (positionIndex: number) => {

    if (insideProject && positions) {
      const id = positions[positionIndex]?.id;
      dispatch(deletePosition(id))
        .then(res => {
          if (res.meta.requestStatus === "fulfilled") remove(positionIndex)
        });
    } else if (!insideProject && proposition && !additionalProposition) {
      const id = proposition.positions[positionIndex]?.id;
      dispatch(deletePosition(id))
        .then(res => {
          if (res.meta.requestStatus === "fulfilled") remove(positionIndex)
        });
    } else if (!insideProject && isAdditional && additionalProposition) {
      const id = additionalProposition.positions[positionIndex]?.id;
      dispatch(deleteAdditionalPosition(id))
        .then(res => {
          if (res.meta.requestStatus === "fulfilled") remove(positionIndex)
        });
    }


    countAllPositionsTotalVAT();
    countAllPositionsPrice();
    countAllPositionsTotalPrice();
    trigger();
  }


  const [dataForUpdateItem, setDataForUpdateItem] = useState<Partial<PositionItemType>>();
  const [updatedPositionItemID, setUpdatedPositionItemID] = useState<string | number>();
  const throttledValueItem = useDebounce(dataForUpdateItem, 200);

  useEffect(() => {
    handleChangePositionItem();
    // eslint-disable-next-line
  }, [throttledValueItem]);

  const handleChangePositionItem = () => {
    if (updatedPositionItemID != null && dataForUpdateItem != null) {
      if (isAdditional) {
        dispatch(changeAdditionalPositionItem({ data: dataForUpdateItem, id: updatedPositionItemID }));
      } else {
        dispatch(changePositionItem({ data: dataForUpdateItem, id: updatedPositionItemID }));
      }

    }
  }

  const [dataForUpdatePosition, setDataForUpdatePosition] = useState<string>();
  const [updatedPositionID, setUpdatedPositionID] = useState<string | number>();
  const throttledValuePosition = useDebounce(dataForUpdatePosition, 400);

  useEffect(() => {
    handleChangePosition();
    // eslint-disable-next-line
  }, [throttledValuePosition]);

  const handleChangePosition = () => {
    if ((positions != null || proposition != null) && updatedPositionID != null && dataForUpdatePosition != null) {
      if (isAdditional) {
        dispatch(changeAdditionalPosition({
          data: {
            title: dataForUpdatePosition,
          },
          id: updatedPositionID
        }))
      } else {
        dispatch(changePosition({
          data: {
            title: dataForUpdatePosition,
          },
          id: updatedPositionID
        }))
      }

    }

  }

  const [dataForUpdatePrositionDesc, setDataForUpdatePrositionDesc] = useState<string>();
  const throttledValuePrositionDesc = useDebounce(dataForUpdatePrositionDesc, 700);

  useEffect(() => {
    handleChangePrositionDesc();
    // eslint-disable-next-line
  }, [throttledValuePrositionDesc]);

  const handleChangePrositionDesc = () => {
    if (dataForUpdatePrositionDesc != null) {
      if (isAdditional && additionalProposition) {
        dispatch(changeAdditionalProposition({ description: dataForUpdatePrositionDesc, id: additionalProposition.id }));
      } else if (proposition) {
        dispatch(changeProposition({ description: dataForUpdatePrositionDesc, id: proposition.id }));
      }
    }
  }

  const [dataForUpdatePrositionTitleArea, setDataForUpdatePrositionTitleArea] = useState<string>();
  const throttledValuePrositionTitleArea = useDebounce(dataForUpdatePrositionTitleArea, 700);

  useEffect(() => {
    handleChangePrositionTitleArea();
    // eslint-disable-next-line
  }, [throttledValuePrositionTitleArea]);

  const handleChangePrositionTitleArea = () => {
    if (dataForUpdatePrositionTitleArea != null) {
      if (isAdditional && additionalProposition) {
        dispatch(changeAdditionalProposition({ title: dataForUpdatePrositionTitleArea, id: additionalProposition.id }));
      } else if (proposition) {
        dispatch(changeProposition({ title: dataForUpdatePrositionTitleArea, id: proposition.id }));
      }
    }
  }


  const handleAddChildPosition = (positionIndex: number, position_id?: number | string) => {

    const newPosition: Partial<PositionItemType> = {
      name: '',
      amount: null,
      buying_price: null,
      client_price: null,
      vat: null,
      total: null,
    };


    const oldPositionsItems = getValues(`options.positions.${positionIndex}.position_items`);
    if (insideProject && position_id) {
      if (isAdditional) {
        dispatch(createAdditionalPositionItem({ position_id: position_id, name: '' }));
      } else {
        dispatch(createPositionItem({ position_id: position_id, name: '' }));
      }
    }
    setValue(`options.positions.${positionIndex}.position_items`, [...oldPositionsItems, newPosition]);
    trigger();
  }


  const handleRemoveChildPosition = (parentIndex: number, indexOfChild: number) => {
    const childPositions = getValues(`options.positions.${parentIndex}.position_items`);

    if (insideProject && positions !== undefined) {
      const itemId = positions[parentIndex].position_items[indexOfChild].id!;
      dispatch(deletePositionItem(itemId));
    }
    if (isAdditional && additionalProposition) {
      const itemId = additionalProposition.positions[parentIndex].position_items[indexOfChild].id!;
      dispatch(deleteAdditionalPositionItem(itemId));
    }
    childPositions.splice(indexOfChild, 1);
    setValue(`options.positions.${parentIndex}.position_items`, childPositions);
    countAllPositionsTotalVAT();
    countAllPositionsPrice();
    countAllPositionsTotalPrice();
    trigger();

  }

  const calculatePositionTotal = (positionIndex: number, childIndex: number, positionItemId?: number | string | undefined): void => {
    const clientPrice = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.client_price`);
    const VAT = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.vat`);
    const amount = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.amount`);

    if (clientPrice != null && VAT != null && amount != null) {
      const total = amount * ((parseFloat(clientPrice.replace(/\s/g, '')) * VAT / 100) + parseFloat(clientPrice.replace(/\s/g, '').replace(/,/g, '.')));
      if (!isNaN(total)) {
        if (insideProject || proposition) {
          dispatch(changePositionItem({ data: { total: total.toFixed(2) }, id: positionItemId! }));
        }
        if (isAdditional) {
          dispatch(changeAdditionalPositionItem({ data: { total: total.toFixed(2) }, id: positionItemId! }))
        }
        setValue(`options.positions.${positionIndex}.position_items.${childIndex}.total`, `${handleFormatNumValue(total.toFixed(2))} €`);
      }
    }
    countAllPositionsTotalVAT();
    countAllPositionsPrice();
    countAllPositionsTotalPrice();
    trigger();
  }

  const countAllPositionsTotalVAT = (): void => {
    if (positions !== undefined) {
      let totalVat = 0;
      positions.forEach((position, positionIndex) => {
        position.position_items.forEach((item, childIndex) => {
          const vat = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.vat`);

          const amount = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.amount`);
          const client_price = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.client_price`);
          const total = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.total`);

          if (vat !== 0 && amount != null && total != null && client_price != null) {
            totalVat += parseFloat(total.replace(/\s/g, '')) - (amount * parseFloat(client_price.replace(/\s/g, '').replace(/,/g, '.')))
          }
        })
      })
      if (!isNaN(totalVat)) {
        setValue(`options.vat`, `${handleFormatNumValue(totalVat.toFixed(2))} €`);
      }

    } else if (!insideProject && proposition) {
      let totalVat = 0;
      proposition.positions.forEach((position, positionIndex) => {
        position.position_items.forEach((item, childIndex) => {
          const vat = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.vat`);

          const amount = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.amount`);
          const client_price = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.client_price`);
          const total = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.total`);

          if (vat !== 0 && amount != null && total != null && client_price != null) {
            totalVat += parseFloat(total.replace(/\s/g, '').replace(/,/g, '.')) - (amount * parseFloat(client_price.replace(/\s/g, '').replace(/,/g, '.')))
          }
        })
      })
      if (!isNaN(totalVat)) {
        setValue(`options.vat`, `${handleFormatNumValue(totalVat.toFixed(2))} €`);
      }
    } else if (!insideProject && !isAdditional && additionalProposition) {
      let totalVat = 0;
      additionalProposition.positions.forEach((position, positionIndex) => {
        position.position_items.forEach((item, childIndex) => {
          const vat = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.vat`);

          const amount = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.amount`);
          const client_price = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.client_price`);
          const total = getValues(`options.positions.${positionIndex}.position_items.${childIndex}.total`);

          if (vat !== 0 && amount != null && total != null && client_price != null) {
            totalVat += parseFloat(total.replace(/\s/g, '')) - (amount * parseFloat(client_price.replace(/\s/g, '').replace(/,/g, '.')))
          }
        })
      })
      if (!isNaN(totalVat)) {
        setValue(`options.vat`, `${handleFormatNumValue(totalVat.toFixed(2))} €`);
      }
    }
  };

  const countAllPositionsPrice = () => {
    let price = 0;
    const positions = getValues(`options.positions`);
    positions.forEach(position => {
      position.position_items.forEach(item => {
        if (item.amount != null && item.client_price != null) {
          price += Number(item.amount) * Number(item.client_price.replace(/\s/g, '').replace(/,/g, '.'));
        }
      })
    });

    if (!isNaN(price)) {
      setValue(`options.price`, `${handleFormatNumValue(price.toFixed(2))} €`);
    }
  }

  const countAllPositionsTotalPrice = (): void => {
    const price = parseFloat(getValues(`options.price`).replace(/\s/g, '').replace(/,/g, '.'));
    const vat = parseFloat(getValues(`options.vat`).replace(/\s/g, '').replace(/,/g, '.'));
    const totalAmount = price + vat;

    if (!isNaN(totalAmount)) {
      setValue(`options.totalAmount`, `${handleFormatNumValue(totalAmount.toFixed(2))} €`);
    }
  }

  const handleFormatNumValue = (event: string) => {
    const inputValue = event;
    const numericValue = inputValue.replace(/\s/g, '');
    const numericOnly = numericValue.replace(/[^0-9.,]/g, '');

    // Ограничение до 8 знаков до точки или запятой
    const maxLength = 6;
    const decimalIndex = numericOnly.indexOf('.');
    const commaIndex = numericOnly.indexOf(',');

    let formattedValue = numericOnly;
    if (decimalIndex !== -1) {
      if (decimalIndex <= maxLength) {
        formattedValue = numericOnly.substring(0, decimalIndex + 1 + maxLength);
      } else {
        formattedValue = numericOnly.substring(0, decimalIndex + 1);
      }
      // Ограничение до двух знаков после точки
      formattedValue = formattedValue.replace(/(\.\d{2})\d+/, '$1');
    } else if (commaIndex !== -1) {
      if (commaIndex <= maxLength) {
        formattedValue = numericOnly.substring(0, commaIndex + 1 + maxLength);
      } else {
        formattedValue = numericOnly.substring(0, commaIndex + 1);
      }
      // Ограничение до двух знаков после запятой
      formattedValue = formattedValue.replace(/(,\d{2})\d+/, '$1');
    } else {
      formattedValue = numericOnly.substring(0, maxLength);
    }

    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/\./g, ',');
  };


  return (
    <OptionsWrapper className={`${activeIndex === 2 && "active"}`}>
      <PositionTitlesWrapper>
        <p>Position</p>
        <p>Typ</p>
        <p>Menge</p>
        <p>Ankaufspreis</p>
        <p>Pr. des Kund.</p>
        <p>MwSt</p>
        <p>Einheiten</p>
        <p>Insgesamt</p>
      </PositionTitlesWrapper>
      <PositionsWrapper>
        {parentPositions.map((position, positionIndex) => (
          <FamilyPositionsWrapper key={position.id}>
            <ParentPositionInputsWrapper>
              <div className="positionInput">
                <Input
                  type="text"
                  placeholder="Eingeben"
                  {...register(`options.positions.${positionIndex}.position`, {
                    required: true,
                    onChange: () => {
                      if (positions != null && getValues(`options.positions.${positionIndex}.position`) != null) {
                        setUpdatedPositionID(positions[positionIndex].id);
                        setDataForUpdatePosition(getValues(`options.positions.${positionIndex}.position`)!)
                      }
                      if (proposition != null && getValues(`options.positions.${positionIndex}.position`) != null) {
                        setUpdatedPositionID(proposition.positions[positionIndex].id);
                        setDataForUpdatePosition(getValues(`options.positions.${positionIndex}.position`)!)
                      }
                      if (isAdditional && getValues(`options.positions.${positionIndex}.position`) != null && additionalProposition) {
                        setUpdatedPositionID(additionalProposition.positions[positionIndex].id);
                        setDataForUpdatePosition(getValues(`options.positions.${positionIndex}.position`)!)
                      }
                    }
                  })}
                />
              </div>
            </ParentPositionInputsWrapper>
            <PositionItemsWrapper>
              {getValues(`options.positions.${positionIndex}.position_items`).map((position, positionItemIndex) => {
                return (
                  <ChildPositionInputsWrapper key={positionItemIndex}>
                    <div className="positionInput">
                      <div className="typeInputWrapper">
                        <Input
                          type="text"
                          placeholder="Eingeben"
                          {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`, {
                            onChange: () => {
                              const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`);
                              const positionItem =
                                !isAdditional && positions
                                  ? positions[positionIndex]?.position_items[positionItemIndex]
                                  : isAdditional && additionalProposition
                                    ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    proposition && !insideProject ?
                                      proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                      :
                                      null;

                              if (positionItem && updatedData != null) {
                                setUpdatedPositionItemID(positionItem.id);
                                setDataForUpdateItem({ name: updatedData });
                                calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                              }
                            },
                            required: true,
                          })}
                        />
                        {positionItemIndex === 0
                          ?
                          (
                            <div
                              className="plus-container"
                              onClick={() => {
                                if (insideProject && positions !== undefined) {
                                  handleAddChildPosition(positionIndex, positions[positionIndex]?.id);
                                } else {
                                  handleAddChildPosition(positionIndex);
                                }
                              }}
                            >
                              <div className="plus-horizontal"></div>
                              <div className="plus-vertical"></div>
                            </div>
                          )
                          :
                          (
                            <div
                              className="plus-container"
                              onClick={() => {
                                handleRemoveChildPosition(positionIndex, positionItemIndex);
                              }}
                            >
                              <div className="plus-horizontal"></div>
                            </div>
                          )
                        }
                      </div>
                    </div>

                    <div className="positionInput">
                      <Input
                        step={0.1}
                        type="number"
                        placeholder="0"
                        min={0}
                        disabled={!watch(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`)}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.amount`, {
                          onChange: () => {
                            const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.amount`);
                            const positionItem =
                              !isAdditional && positions
                                ? positions[positionIndex]?.position_items[positionItemIndex]
                                : isAdditional && additionalProposition
                                  ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                  :
                                  proposition && !insideProject ?
                                    proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    null;

                            if (positionItem && updatedData != null) {
                              setUpdatedPositionItemID(positionItem.id);
                              setDataForUpdateItem({ amount: updatedData });
                              calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                            }
                          },
                          required: true,
                          min: 0,
                        })}
                      />
                    </div>

                    <div className="positionInput">
                      <Input
                        step={0.01}
                        type="text"
                        placeholder="0 €"
                        min={0}
                        disabled={!watch(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`)}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.buying_price`, {
                          onChange: (event) => {
                            setValue(`options.positions.${positionIndex}.position_items.${positionItemIndex}.buying_price`, handleFormatNumValue(event.target.value));
                            const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.buying_price`);
                            if (updatedData != null) {
                              const positionItem =
                                !isAdditional && positions
                                  ? positions[positionIndex]?.position_items[positionItemIndex]
                                  : isAdditional && additionalProposition
                                    ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    proposition && !insideProject ?
                                      proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                      :
                                      null;

                              if (positionItem && updatedData != null) {
                                setUpdatedPositionItemID(positionItem.id);
                                setDataForUpdateItem({ buying_price: updatedData.replace(/\s/g, '').replace(/,/g, '.') });
                                calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                              }
                            }
                          },
                          required: true,
                          min: 0
                        })}
                      />
                    </div>

                    <div className="positionInput">
                      <Input
                        step={0.01}
                        type="text"
                        placeholder="0 €"
                        min={0}
                        disabled={!watch(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`)}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.client_price`, {
                          onChange: (event) => {
                            setValue(`options.positions.${positionIndex}.position_items.${positionItemIndex}.client_price`, handleFormatNumValue(event.target.value));
                            const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.client_price`);
                            if (updatedData != null) {
                              const positionItem =
                                !isAdditional && positions
                                  ? positions[positionIndex]?.position_items[positionItemIndex]
                                  : isAdditional && additionalProposition
                                    ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    proposition && !insideProject ?
                                      proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                      :
                                      null;

                              if (positionItem && updatedData != null) {
                                setUpdatedPositionItemID(positionItem.id);
                                setDataForUpdateItem({ client_price: updatedData.replace(/\s/g, '').replace(/,/g, '.') });
                                calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                              }
                            }
                          },
                          required: true,
                          min: 0
                        })}
                      />
                    </div>

                    <div className="positionInput">
                      <VatSelect
                        disabled={!watch(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`)}
                        id={`options.positions.${positionIndex}.childPositions.${positionItemIndex}.vat`}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.vat`, {
                          onChange: () => {
                            const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.vat`);
                            if (updatedData != null) {
                              const positionItem =
                                !isAdditional && positions
                                  ? positions[positionIndex]?.position_items[positionItemIndex]
                                  : isAdditional && additionalProposition
                                    ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    proposition && !insideProject ?
                                      proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                      :
                                      null;

                              if (positionItem && updatedData != null) {
                                setUpdatedPositionItemID(positionItem.id);
                                setDataForUpdateItem({ vat: updatedData });
                                calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                              }
                            }
                          },
                          required: true
                        })}
                      >
                        <Option
                          value="">MwSt</Option>
                        <Option
                          value="0">0%</Option>
                        <Option
                          value="19">19%</Option>
                      </VatSelect>
                      <div className="arrow-wrapper"><SelectArrow /></div>
                    </div>

                    <div className="positionInput">
                      <VatSelect
                        disabled={!watch(`options.positions.${positionIndex}.position_items.${positionItemIndex}.name`)}
                        id={`options.positions.${positionIndex}.childPositions.${positionItemIndex}.units`}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.units`, {
                          onChange: () => {
                            const updatedData = getValues(`options.positions.${positionIndex}.position_items.${positionItemIndex}.units`);
                            if (updatedData != null) {
                              const positionItem =
                                !isAdditional && positions
                                  ? positions[positionIndex]?.position_items[positionItemIndex]
                                  : isAdditional && additionalProposition
                                    ? additionalProposition.positions[positionIndex]?.position_items[positionItemIndex]
                                    :
                                    proposition && !insideProject ?
                                      proposition.positions[positionIndex]?.position_items[positionItemIndex]
                                      :
                                      null;

                              if (positionItem && updatedData != null) {
                                setUpdatedPositionItemID(positionItem.id);
                                setDataForUpdateItem({ units: updatedData });
                                calculatePositionTotal(positionIndex, positionItemIndex, positionItem.id);
                              }
                            }
                          },
                          required: true
                        })}
                      >
                        <Option
                          value="">Einheiten</Option>
                        <Option
                          value="kg">Kilogram</Option>
                        <Option
                          value="g">Gram</Option>
                        <Option
                          value="l">Liter</Option>
                        <Option
                          value="m">Meter</Option>
                        <Option
                          value="cm">Centimeter</Option>
                        <Option
                          value="stück">Stück</Option>
                        <Option
                          value="kWp">kWp</Option>
                        <Option
                          value="pauschal">Pauschal</Option>
                        <Option
                          value="stunden">Stunden</Option>
                      </VatSelect>
                      <div className="arrow-wrapper"><SelectArrow /></div>
                    </div>
                    <div className="positionInput">
                      <Input
                        type="text"
                        placeholder="0 €"
                        disabled={true}
                        {...register(`options.positions.${positionIndex}.position_items.${positionItemIndex}.total`)}

                        className={`disabledTotalInput`}
                      />
                    </div>
                  </ChildPositionInputsWrapper>
                )
              })
              }
            </PositionItemsWrapper>
            <RemoveIcon>
              <div className="remove-container" onClick={() => handleRemovePosition(positionIndex)}>
                <div className="line-horizontal"></div>
                <div className="line-vertical"></div>
              </div>
            </RemoveIcon>
          </FamilyPositionsWrapper>
        ))}
        <SecondaryButton onClick={() => handleAddNewPosition({ isDispatch: true })}>Position hinzufügen</SecondaryButton>

      </PositionsWrapper>

      <TitleWrapper>
        <p>Notizen</p>
        <TitleArea
          id="notes"
          placeholder="Geben Sie den Text hier ein"
          rows={9}
          {...register('options.notes', {
            onChange: () => {
              setDataForUpdatePrositionDesc(getValues(`options.notes`));
            },
          })}
        />
      </TitleWrapper>

      <NotesWrapper>
        <p>Text</p>
        <Notes
          id="title"
          placeholder="Geben Sie den Text hier ein"
          rows={9}
          {...register('options.title', {
            onChange: () => {
              setDataForUpdatePrositionTitleArea(getValues(`options.title`));
            },
          })}
        />
      </NotesWrapper>



      <TotalCalcWrapper>
        <div className="totalCalcInputWrapper">
          <p>Preis</p>
          <Input
            type="text"
            placeholder="0 €"
            disabled={true}
            {...register(`options.price`)}
            className={`disabledTotalInput`}
          />
        </div>

        <div className="totalCalcInputWrapper">
          <p>MwSt </p>
          <Input
            type="text"
            placeholder="0 %"
            disabled={true}
            {...register(`options.vat`)}

            className={`disabledTotalInput`}
          />
        </div>

        <div className="totalCalcInputWrapper">
          <h3>Gesamtbetrag</h3>
          <Input
            type="text"
            placeholder="0 €"
            disabled={true}
            {...register(`options.totalAmount`)}

            className={`disabledTotalInput--totalAmount`}
          />
        </div>
      </TotalCalcWrapper>
    </OptionsWrapper>
  )
}

export default ThirdStep;