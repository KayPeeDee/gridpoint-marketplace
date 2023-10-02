import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  timer: 3000,
  timerProgressBar: true,
  // background: '#4C4C4C',
  // color: '#ffffff',
  // buttonsStyling: false,
  // confirmButtonColor: '#4c4c4c',
  // customClass: {
  //   confirmButton: 'btn btn-shadow btn-sm'
  // },
  // iconColor: '#5FE55B',
});

export const Modal = Swal.mixin({
  backdrop: true,
  allowOutsideClick: false,
  //background: '#4C4C4C',
  //color: '#ffffff',
  // buttonsStyling: false,
  //confirmButtonColor: '#4c4c4c',
  // customClass: {
  //   confirmButton: 'btn btn-shadow btn-sm'
  // },
  //iconColor: '#5FE55B'
});

export const ConfirmModal = Swal.mixin({
  backdrop: true,
  allowOutsideClick: false,
  background: '#4C4C4C',
  color: '#ffffff',
  buttonsStyling: false,
  confirmButtonColor: '#4c4c4c',
  customClass: {
    confirmButton: 'btn btn-shadow btn-sm me-2',
    cancelButton: 'btn btn-shadow btn-sm'
  },
  iconColor: '#5FE55B',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  showLoaderOnConfirm: true,
});

export const WarningModal = Swal.mixin({
  backdrop: true,
  allowOutsideClick: false,
  background: '#4C4C4C',
  color: '#ffffff',
  buttonsStyling: false,
  confirmButtonColor: '#4c4c4c',
  customClass: {
    confirmButton: 'btn btn-shadow btn-sm me-2',
    cancelButton: 'btn btn-shadow btn-sm'
  },
  iconColor: '#5FE55B',
  showCancelButton: true,
  confirmButtonText: 'Proceed',
  cancelButtonText: 'Adjust',
  showLoaderOnConfirm: true,
});


