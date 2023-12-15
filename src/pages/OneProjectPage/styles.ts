import {styled} from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 72px 16px;
  width: 100%;
  min-height: 100%;
  position: relative;

  .project {
    max-width: 778px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .chat{
    height: fit-content;
  }

  .progressBlock {
    margin-left: 10px;
    display: flex;
    gap: 9px;
    padding: 0 20px;

    .stepContainer {
      display: flex;
      align-items: baseline;
      gap: 8px;

      .stepValue {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #929292;
        color: #929292;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }

      .stepName {
        color: #929292;
      }
    }

    .activeStepContainer {
      .stepValue {
        background-color: #6a994e;
        color: #fff;
      }

      .stepName {
        color: #000;
      }

      .line {
        background-color: #000;
      }
    }

    .completedContainer {
      .stepValue {
        background-color: #fff;
        border: 1px solid #6a994e;
      }

      .stepName {
        color: #6a994e;
      }

      .line {
        background-color: #6a994e;
      }
    }

    .completedContainer.activeStepContainer {
      .stepName {
        font-weight: 800;
      }
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .line {
      width: 120px;
      height: 1px;
      background-color: #929292;
    }
  }

  .main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }

  .btnGroup {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }

  .spinerOverlay {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    position: absolute;
    z-index: 100;

    .spiner {
      margin-top: 100px;
      width: 40px;
      height: 40px;
    }
  }

  .problemsWrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
