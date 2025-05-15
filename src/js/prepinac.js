$(document).ready(function() {
    $('.bottom').on('click', function(event) {
        // Your code here
        console.log('Bottom class element clicked:', this);
        // Prevent default action if needed
        event.preventDefault();
        // Add your custom logic here
        // For example, you can toggle a class or perform an action
        $('.bazeny').addClass('active');
        $('.cistky').removeClass('active');
        $('.services h2').text('Ponúkame');
    });
    $('.top').on('click', function(event) {
        // Your code here
        console.log('Top class element clicked:', this);
        // Prevent default action if needed
        event.preventDefault();
        // Add your custom logic here
        // For example, you can toggle a class or perform an action
        $('.cistky').addClass('active');
        $('.bazeny').removeClass('active');
        $('.services h2').text('Pri práci používame');
    });
});
