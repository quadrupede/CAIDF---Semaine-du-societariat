<?php get_header(); ?>
<div style="margin: 0 2vw;text-align:center;">
<h1><?php the_title(); ?></h1>

<?php if (have_posts()): 
	while (have_posts()) : the_post(); ?>
		<?php the_content(); ?>

	<?php endwhile;
endif; ?>
<a href="<?php echo bloginfo('url'); ?>">Retour au site</a>
</div>
<?php get_footer(); ?>