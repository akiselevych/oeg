import { styled } from "styled-components"
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px 0 20px 0;
    height: 100%;
    .btnStatus{
             width: 110px;
            };
    .createPrjectForm{
        display: flex;
        flex-direction: column;
        gap: 16px;
        .inputs{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .submit{
            border-radius: 10px;
            background:  #6A994E;
            padding: 10px 12px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            &:disabled {
            background: #E9E9E9;
            cursor: not-allowed; 
}
        }
        .messages, .submit{
            align-self: flex-end;
        }
       
    }
    .propositonBlock{
        display: flex;
        flex-direction: column;
        gap: 12px;
        .create{
            align-self: flex-end;
        }
        .title{
            font-size: 20px;
            font-weight: 500;
        }
        .propositionsList{
            padding: 24px;
            background-color: white;
            border-radius: 12px;
            border: 1px solid #D9D9D9;
            height: 120px;
            width: 100%;
        }
        .propositionsListWrapper{
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
        }
        .placeholder{
            color: #828282;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
        }
        .proposition{
            padding: 8px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #CFCFCF;
            .name{
                text-transform: none;
                color:  #000;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                .nameValue{
                  overflow: auto;
                white-space: nowrap;
                }
            }
            .btnContainer{
                display: flex;
                gap:8px;
                position: relative;

            }

        }
    }
    .confirmedBlock {       
        display: flex;
        flex-direction: column;
        gap: 12px;
        .create{
            align-self: flex-end;
        }
        .title{
            font-size: 20px;
            font-weight: 500;
        }
        .propositionsList{
            padding: 24px;
            background-color: white;
            border-radius: 12px;
            border: 1px solid #D9D9D9;
            height: 120px;
            width: 100%;
        }
        .placeholder{
            color: #828282;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
        }
        .proposition{
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-bottom: 1px solid #CFCFCF;
           padding: 8px 10px;
            .name{
                padding: 8px 10px;
                display: flex;
                align-items: center;
                gap:8px;
                border-radius: 12px;
                border: 1px solid rgba(106, 153, 78, 0.40);
                width: 240px;
                text-transform: none;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                .nameValue{
                  overflow: auto;
                white-space: nowrap;
                }
            }
            .btnContainer{
                display: flex;
                gap:8px;
            }
        }
    }
    .documentsBlock{
        display: flex;
        flex-direction: column;
        gap: 16px;
        .title{
            font-size: 20px;
            font-weight: 500;
        }
        
    }
    .documentsList{
        background-color: white;
        border-radius: 12px;
        border: 1px solid #D9D9D9;
        width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .document{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name{
                padding: 8px 10px;
                display: flex;
                align-items: center;
                gap:8px;
                border-radius: 12px;
                border: 1px solid rgba(106, 153, 78, 0.40);
                width: 240px;
                text-transform: none;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
            .btnContainer{
                display: flex;
                gap:8px;
            }
        }
    }
`
export const CreateProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px
`
export const Label = styled.div`
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    span{
        color: red;
    }
`
export const Input = styled.input`
    width: 218px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #DEDEDE;
`
export const Select = styled.select`
    width: 218px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #DEDEDE;
    .option {
        padding: 8px 0;
        gap: 8px;
        display: flex;
        align-items: center;
        overflow: auto;
    }
`
