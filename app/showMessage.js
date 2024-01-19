export function showMessage(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        destination: '',
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === 'error' ? 'red' : 'green',
        },
        onClick: function(){} // Callback after click
      }).showToast();
}