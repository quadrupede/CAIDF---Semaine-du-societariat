<section id="section-3">
	<div class="section-3">
	<div class="videos">
		<div class="videos__content">
			<h2><?php the_field('titre_videos'); ?></h2>
			<?php the_field('texte_videos'); ?>
			<div class="videos__videos">
				<?php
				if( have_rows('videos') ) :
					while ( have_rows('videos') ) : the_row(); ?>
				<div class="videos__video">
					<iframe src="" data-src="http://www.youtube.com/embed/<?php the_sub_field('video'); ?>" frameborder="0"></iframe> 
				</div>
					<?php endwhile;
				endif; ?>
			</div>
			<?php
			if( have_rows('bouton_videos') ) :
				while ( have_rows('bouton_videos') ) : the_row(); ?>
			<a class="videos__btn" target="_blank" href="<?php the_sub_field('lien'); ?>"><?php the_sub_field('texte'); ?></a>
				<?php endwhile;
			endif; ?>
		</div>
	</div>
	</div>
</section>