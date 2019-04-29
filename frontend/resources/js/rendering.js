var $result = $('#form'); 
$('#login').click(function() {
    $result.load('/partial/login');
});
$('#register').click(function() {
    $result.load('/partial/register');
});

var $nav = $('#page');

$('#dashboard').click(function() {
    $nav.load('/partial/dashboard');
    $('.open').removeClass('open');
    $('#dashboard').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#dashboard').addClass('active');
});
$('#color-palette').click(function() {
    $nav.load('/partial/color-palette');
    $('.open').removeClass('open');
    $('#color-palette').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#color-palette').addClass('active');
});

$('#inbox').click(function() {
    $nav.load('/partial/inbox');
    $('.open').removeClass('open');
    $('#inbox').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#inbox').addClass('active');
});

$('#chat').click(function() {
    $nav.load('/partial/chat');
    $('.open').removeClass('open');
    $('#chat').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#chat').addClass('active');
});

$('#taskboard').click(function() {
    $nav.load('/partial/taskboard');
    $('.open').removeClass('open');
    $('#taskboard').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#taskboard').addClass('active');
});

$('#calendar').click(function() {
    $nav.load('/partial/calendar');
    $('.open').removeClass('open');
    $('#calendar').removeClass('nav-item');
    $('.active').addClass('nav-item');
    $('.active').removeClass('active');
    $('#calendar').addClass('active');
});

$('#grids').click(function() {
    $nav.load('/partial/uikit/grid');
    $('.open').removeClass('open');
    $('.active').removeClass('active');
    $('#uikit').addClass('open');
    $('#grids').addClass('active');
});

$('#typography').click(function() {
    $nav.load('/partial/uikit/typography');
    $('.open').removeClass('open');
    $('.active').removeClass('active');
    $('#uikit').addClass('open');
    $('#typography').addClass('active');
});

$('#syntax-highlighter').click(function() {
    $nav.load('/partial/uikit/syntax-highlighter');
    $('.open').removeClass('open');
    $('.active').removeClass('active');
    $('#uikit').addClass('open');
    $('#syntax-highlighter').addClass('active');
});

$('#helper-classes').click(function() {
    $nav.load('/partial/uikit/helper-classes');
    $('.open').removeClass('open');
    $('.active').removeClass('active');
    $('#uikit').addClass('open');
    $('#helper-classes').addClass('active');
});

$('#text-utilities').click(function() {
    $nav.load('/partial/uikit/text-utilities');
    $('.open').removeClass('open');
    $('.active').removeClass('active');
    $('#uikit').addClass('open');
    $('#text-utilities').addClass('active');
});
