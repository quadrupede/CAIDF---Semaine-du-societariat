<section id="section-2">
	<div class="section-2">
	<div class="raisons">
		<div class="raisons__content">
			<h2><?php the_field('titre_raisons'); ?></h2>
			<div class="raisons__encart">
				<?php the_field('texte_raisons'); ?>
				<ul class="raisons__list">
				<?php
				if( have_rows('raisons') ) :
					$i = 0;
					while ( have_rows('raisons') ) : the_row(); $i++; ?>
					<li class="raisons__raison <?php if ($i%2 != 0) { ?>raisons__raison--pair<?php } ?>">
						<div class="raisons__raison__picto">
							<img src="<?php echo get_sub_field('icone')['url'] ?>" alt="<?php echo get_sub_field('icone')['alt'] ?>">
						</div>
						<div class="raisons__raison__text">
							<?php the_sub_field('texte'); ?>
						</div>
					</li>
					<?php endwhile;
				endif; ?>
				</ul>
			</div>
		</div>
	</div>
	<div class="bouger">
		<div class="bouger__background" style="background-image:url(<?php echo get_field('background_bouger')['url']; ?>);">
			<div class="bouger__cloud1"></div>
			<div class="bouger__cloud2"></div>
		</div>
		<div class="bouger__content">
			<h2><?php the_field('titre_bouger'); ?></h2>
			<div class="bouger__encart">
				<?php the_field('texte_bouger'); ?>
				<div class="bouger__encart__images">
					<?php
					if( have_rows('images_bouger') ) :
						while ( have_rows('images_bouger') ) : the_row(); ?>
					<img src="<?php echo get_sub_field('image')['url'] ?>" alt="<?php echo get_sub_field('image')['alt'] ?>" class="bouger__encart__image">
						<?php endwhile;
					endif; ?>
				</div>
				<?php
				if( have_rows('bouton_bouger') ) :
					while ( have_rows('bouton_bouger') ) : the_row(); ?>
				<a class="bouger__btn" href="<?php the_sub_field('lien'); ?>" target="_blank"><span><?php the_sub_field('texte'); ?></span></a>
					<?php endwhile;
				endif; ?>
			</div>
		</div>
	</div>
	</div>
</section>
