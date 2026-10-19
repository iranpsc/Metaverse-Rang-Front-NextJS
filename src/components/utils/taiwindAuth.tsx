export const cssAuth = (props: any, fieldName: string) => {
  return `
    w-full mx-3 h-[50px] outline-borderField ps-[10px] rounded-[5px] bg-[#FCFCFC] border 
    dark:bg-dark-Field dark:border-dark-borderField dark:outline-hidden
    ${
      props.touched[fieldName] && props.errors[fieldName]
        ? "border-error dark:border-error focus:border-error dark:bg-dark-bgFieldError dark:text-dark-textFieldError focus:border-dark-borderFieldError focus:outline-hidden"
        : "border-borderField focus:border-borderField"
    }
    border-borderField font-azarMehr font-light `;
};
