import Swal from 'sweetalert2';
import getErrorMessage from './get-error-message';

const showErrorMessage = (error: unknown) => {
  const errorMessage = getErrorMessage(error);
  Swal.fire({ icon: 'error', title: 'Erro', text: errorMessage });
};

export default showErrorMessage;
