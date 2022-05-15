const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
event.preventDefault();

btn.value = 'Enviando...';
const serviceID = 'default_service';
const templateID = 'template_nff3f2q';

emailjs.sendForm(serviceID, templateID, this)
.then(() => {
    btn.value = 'Enviar';
    Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        title: `Su información nos ha llegado correctamente!`, 
        icon: 'success',
    });
    document.getElementById('form').reset();
}, (err) => {
    btn.value = 'Enviar';
    alert(JSON.stringify(err));
    });
})
