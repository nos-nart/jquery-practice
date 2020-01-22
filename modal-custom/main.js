$(function() {
    // https://dev.to/tylermcginnis/a-beginners-guide-to-javascripts-prototype-5kk
    (function() {
        this.Modal = function() {
            this.closeButton = null;
            this.modal = null;
            this.overlay = null;

            var defaults = {
                className: 'fade-and-drop',
                closeButton: true,
                content: '',
                maxWidth: 600,
                minWidth: 280,
                overlay: true
            }
        }
    }())
    
})