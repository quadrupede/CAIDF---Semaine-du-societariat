<?php

function add_scripts() {
    wp_register_script('vendorJs', get_stylesheet_directory_uri().'/js/vendors.js', array('jquery'),false, true);

    $suffix = '.min';
    if ( WP_DEBUG === true ) {
        $suffix = '';
    }
    wp_register_script('customJs', get_stylesheet_directory_uri().'/js/custom'.$suffix.'.js', array('vendorJs'),false, true);
    wp_enqueue_script('customJs');

    wp_register_style('customCss', get_stylesheet_directory_uri().'/style.css', array());
    wp_enqueue_style('customCss');

}

add_action( 'wp_enqueue_scripts', 'add_scripts' ); 


if ( ! defined( 'USE_LOCAL_ACF_CONFIGURATION' ) || ! USE_LOCAL_ACF_CONFIGURATION ) {
    include_once('acf.php');
}

// Disable support for comments and trackbacks in post types
function df_disable_comments_post_types_support() {
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        if(post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
}
add_action('admin_init', 'df_disable_comments_post_types_support');

// Close comments on the front-end
function df_disable_comments_status() {
    return false;
}
add_filter('comments_open', 'df_disable_comments_status', 20, 2);
add_filter('pings_open', 'df_disable_comments_status', 20, 2);

// Hide existing comments
function df_disable_comments_hide_existing_comments($comments) {
    $comments = array();
    return $comments;
}
add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);

// Remove comments page in menu
function df_disable_comments_admin_menu() {
    remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'df_disable_comments_admin_menu');

// Redirect any user trying to access comments page
function df_disable_comments_admin_menu_redirect() {
    global $pagenow;
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url()); exit;
    }
}
add_action('admin_init', 'df_disable_comments_admin_menu_redirect');


// Remove comments links from admin bar
function df_disable_comments_admin_bar() {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
}
add_action('init', 'df_disable_comments_admin_bar');


// remove unwanted dashboard widgets for relevant users
function remove_dashboard_widgets() {
    $user = wp_get_current_user();
   // if ( ! $user->has_cap( 'manage_options' ) ) {
        remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
   // }
}
add_action( 'wp_dashboard_setup', 'remove_dashboard_widgets' );

// add new dashboard widgets
function add_dashboard_widgets() {
    wp_add_dashboard_widget( 'dashboard_welcome', get_bloginfo('name'), 'add_welcome_widget' );
}
function add_welcome_widget(){ ?>
 
    <h2>Bienvenu dans l'interface d'administration de votre site</h2>
    <p>Vous pouvez gerer le contenu de votre site via le menu de gauche :</p>
    
    <ul>
    <li><b>Pages</b> : Les differentes pages de votre site</li>
    <li><b>Options</b> : Le jeu
    <li><b>SEO</b> : Les réglages SEO pour le referencement de votre site</li>
    </ul>
<?php }

add_action( 'wp_dashboard_setup', 'add_dashboard_widgets' );
?>
