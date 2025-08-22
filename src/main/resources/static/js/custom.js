// Custom JavaScript for Sistema de Gestión de Clínica

document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const alertInstance = new bootstrap.Alert(alert);
            alertInstance.close();
        }, 5000);
    });

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Confirmation dialogs
    const deleteButtons = document.querySelectorAll('[onclick*="confirm"]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const confirmed = confirm('¿Está seguro de realizar esta acción?');
            if (!confirmed) {
                event.preventDefault();
            }
        });
    });

    // Search form enhancement
    const searchInputs = document.querySelectorAll('input[name="busqueda"]');
    searchInputs.forEach(function(input) {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.target.closest('form').submit();
            }
        });
    });

    // Date input validation
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(function(input) {
        if (input.name === 'fechaNacimiento') {
            // Set max date to today for birth dates
            const today = new Date().toISOString().split('T')[0];
            input.setAttribute('max', today);
        }
    });

    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Loading spinner for form submissions
    function showLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'spinner-overlay';
        spinner.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>';
        document.body.appendChild(spinner);
    }

    function hideLoadingSpinner() {
        const spinner = document.querySelector('.spinner-overlay');
        if (spinner) {
            spinner.remove();
        }
    }

    // Add loading spinner to form submissions
    forms.forEach(function(form) {
        form.addEventListener('submit', function() {
            if (form.checkValidity()) {
                showLoadingSpinner();
            }
        });
    });
});

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES');
}

function formatDateTime(datetime) {
    return new Date(datetime).toLocaleString('es-ES');
}