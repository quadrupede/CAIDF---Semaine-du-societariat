<section id="section-4" >
	<div class="jeu jeu--start jeu--current">
		<div class="jeu__top jeu__top--start">
			<div class="jeu__top--start__squares">
				<div class="jeu__top--start__square-2"></div>
				<div class="jeu__top--start__square-1"></div>
			</div>
		</div>
		<div class="jeu__bottom jeu__bottom--start">
			<div class="jeu__bottom__content">
				<h2><?php the_field('titre', 'options') ?></h2>
				<div class="jeu__bottom__subtitle">
					<?php the_field('sous_titre', 'options') ?>
				</div>
				<a class="jeu__bottom--start__btn" href="#"><span>Je joue !</span></a>
			</div>
		</div>
	</div>
	<?php
	if( have_rows('ecrans', 'options') ) : $i = 0;
		while ( have_rows('ecrans', 'options') ) : the_row(); $i++; ?>
	<div class="jeu jeu--ecrans jeu--<?php echo $i ?> jeu--after" data-word="<?php the_sub_field('mot'); ?>">
		<div class="jeu__top">
			<?php
			if( have_rows('images') ) :
				while ( have_rows('images') ) : the_row(); ?>
			<div class="jeu__top__left" style="background-image:url(<?php echo get_sub_field('photo')['url']; ?>"></div>
			<div class="jeu__top__right" style="background-image:url(<?php echo get_sub_field('picto')['url']; ?>"></div>
				<?php endwhile;
			endif; ?>
			</div>
		<div class="jeu__bottom">
			<div class="jeu__bottom__letters__wrapper">
				<div class="jeu__bottom__letters"></div>
			</div>
			<a href="#" class="jeu__bottom__btn--indice">Un indice</a>
			<div class="jeu__bottom__indice hidden"><?php the_sub_field('indice'); ?></div>
			<?php if ($i == 1) { ?>
			<div class="jeu__bottom__help hidden"><?php the_field('aide', 'options'); ?></div>
			<?php } ?>
		</div>
	</div>
		<?php endwhile;
	endif; $i++; ?>
	<div class="jeu jeu--end jeu--<?php echo $i; ?> jeu--after">
		<div class="jeu--end__content">
			<div class="jeu--end__title"><?php the_field('titre_fin', 'options'); ?></div>
			<div class="jeu--end__subtitle"><?php the_field('sous_titre_fin', 'options'); ?></div>
			<div class="jeu--end__encart">
				<div class="jeu--end__plus"></div>
				<div class="jeu--end__text"><?php the_field('texte_fin', 'options') ?></div>
				<?php
				if( have_rows('bouton_fin', 'options') ) :
					while ( have_rows('bouton_fin', 'options') ) : the_row(); ?>
				<a class="jeu--end__btn" target="_blank" href="<?php the_sub_field('lien'); ?>"><?php the_sub_field('texte'); ?></a>
					<?php endwhile;
				endif; ?>
			</div>
		</div>
	</div>
</section>