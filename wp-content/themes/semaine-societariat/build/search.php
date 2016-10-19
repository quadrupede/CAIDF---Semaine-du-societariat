<?php get_header(); ?>

<h1><?php echo sprintf( __( '%s Resultat(s) pour ', 'boilerplate' ), $wp_query->found_posts ); echo get_search_query(); ?></h1>

<?php get_template_part('loop'); ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>