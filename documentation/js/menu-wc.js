'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pinna-costa documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-e27b2b291af412152ac1b343b681cc644bcd01c0707a9e004b7f9b0a7bf034ae51f1a32f10f7c2a49b82a46f86036dcef0db3fb54128a34d36d1f32bd551ed69"' : 'data-bs-target="#xs-components-links-module-AdminModule-e27b2b291af412152ac1b343b681cc644bcd01c0707a9e004b7f9b0a7bf034ae51f1a32f10f7c2a49b82a46f86036dcef0db3fb54128a34d36d1f32bd551ed69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-e27b2b291af412152ac1b343b681cc644bcd01c0707a9e004b7f9b0a7bf034ae51f1a32f10f7c2a49b82a46f86036dcef0db3fb54128a34d36d1f32bd551ed69"' :
                                            'id="xs-components-links-module-AdminModule-e27b2b291af412152ac1b343b681cc644bcd01c0707a9e004b7f9b0a7bf034ae51f1a32f10f7c2a49b82a46f86036dcef0db3fb54128a34d36d1f32bd551ed69"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-1dce2eddf1b7f35c2cb004b0394bf42a030044860460cab04f733cd81b9d582a7fd401bcb8f02e5beeee59745cc410db481cc834bc6f6c727d84a941dd61d0a4"' : 'data-bs-target="#xs-components-links-module-AppModule-1dce2eddf1b7f35c2cb004b0394bf42a030044860460cab04f733cd81b9d582a7fd401bcb8f02e5beeee59745cc410db481cc834bc6f6c727d84a941dd61d0a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1dce2eddf1b7f35c2cb004b0394bf42a030044860460cab04f733cd81b9d582a7fd401bcb8f02e5beeee59745cc410db481cc834bc6f6c727d84a941dd61d0a4"' :
                                            'id="xs-components-links-module-AppModule-1dce2eddf1b7f35c2cb004b0394bf42a030044860460cab04f733cd81b9d582a7fd401bcb8f02e5beeee59745cc410db481cc834bc6f6c727d84a941dd61d0a4"' }>
                                            <li class="link">
                                                <a href="components/AcercaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AcercaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaEncargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaEncargosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaProductosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaProductosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductoDetalleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductoDetalleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecuperarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecuperarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CatalogoModule.html" data-type="entity-link" >CatalogoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CatalogoModule-fc71f9c0f1e3063f91c6dc9898d48ac2a299dc429daa0bc572c990200c491a98d2e49439589cf66c0301deffdceccca72f4867e650e313ae923a4d7c5e5d0e36"' : 'data-bs-target="#xs-components-links-module-CatalogoModule-fc71f9c0f1e3063f91c6dc9898d48ac2a299dc429daa0bc572c990200c491a98d2e49439589cf66c0301deffdceccca72f4867e650e313ae923a4d7c5e5d0e36"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CatalogoModule-fc71f9c0f1e3063f91c6dc9898d48ac2a299dc429daa0bc572c990200c491a98d2e49439589cf66c0301deffdceccca72f4867e650e313ae923a4d7c5e5d0e36"' :
                                            'id="xs-components-links-module-CatalogoModule-fc71f9c0f1e3063f91c6dc9898d48ac2a299dc429daa0bc572c990200c491a98d2e49439589cf66c0301deffdceccca72f4867e650e313ae923a4d7c5e5d0e36"' }>
                                            <li class="link">
                                                <a href="components/CatalogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatalogoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EncargosModule.html" data-type="entity-link" >EncargosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EncargosModule-acc79608ddfe20e2f68cf1e04e57e8acb0e35cee4317dfed577d6b15cd00114d76c0e733b4f318828eabb916e332c0969c2f0eea7389ebded47c79c6fda3cd25"' : 'data-bs-target="#xs-components-links-module-EncargosModule-acc79608ddfe20e2f68cf1e04e57e8acb0e35cee4317dfed577d6b15cd00114d76c0e733b4f318828eabb916e332c0969c2f0eea7389ebded47c79c6fda3cd25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EncargosModule-acc79608ddfe20e2f68cf1e04e57e8acb0e35cee4317dfed577d6b15cd00114d76c0e733b4f318828eabb916e332c0969c2f0eea7389ebded47c79c6fda3cd25"' :
                                            'id="xs-components-links-module-EncargosModule-acc79608ddfe20e2f68cf1e04e57e8acb0e35cee4317dfed577d6b15cd00114d76c0e733b4f318828eabb916e332c0969c2f0eea7389ebded47c79c6fda3cd25"' }>
                                            <li class="link">
                                                <a href="components/EncargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncargosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-00f02e2ab0e93d4e68311dab6b88e0cd4153d21ef5e8bc3793c3ad7b37995a3243350b2c32720e10e1a4c1ad4234c99ef345d4f48542143b6430ce505475518a"' : 'data-bs-target="#xs-components-links-module-LoginModule-00f02e2ab0e93d4e68311dab6b88e0cd4153d21ef5e8bc3793c3ad7b37995a3243350b2c32720e10e1a4c1ad4234c99ef345d4f48542143b6430ce505475518a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-00f02e2ab0e93d4e68311dab6b88e0cd4153d21ef5e8bc3793c3ad7b37995a3243350b2c32720e10e1a4c1ad4234c99ef345d4f48542143b6430ce505475518a"' :
                                            'id="xs-components-links-module-LoginModule-00f02e2ab0e93d4e68311dab6b88e0cd4153d21ef5e8bc3793c3ad7b37995a3243350b2c32720e10e1a4c1ad4234c99ef345d4f48542143b6430ce505475518a"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistroModule.html" data-type="entity-link" >RegistroModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistroModule-fe500855d2a628c1a0281c8c4dd8fd5001c2cb7387ceec7cb2319221b7076909aefe8a1c803bb880e851d7d0fe355bfbe90727e3249472be3a7246d179226470"' : 'data-bs-target="#xs-components-links-module-RegistroModule-fe500855d2a628c1a0281c8c4dd8fd5001c2cb7387ceec7cb2319221b7076909aefe8a1c803bb880e851d7d0fe355bfbe90727e3249472be3a7246d179226470"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistroModule-fe500855d2a628c1a0281c8c4dd8fd5001c2cb7387ceec7cb2319221b7076909aefe8a1c803bb880e851d7d0fe355bfbe90727e3249472be3a7246d179226470"' :
                                            'id="xs-components-links-module-RegistroModule-fe500855d2a628c1a0281c8c4dd8fd5001c2cb7387ceec7cb2319221b7076909aefe8a1c803bb880e851d7d0fe355bfbe90727e3249472be3a7246d179226470"' }>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-98d651640ab83e69834cca88ab16cf661207098601b542ca632650211e83726d149c83b82753d1c6e175f17c598f1e61a98606fc44262b4eccf7faed85a4a1de"' : 'data-bs-target="#xs-components-links-module-SharedModule-98d651640ab83e69834cca88ab16cf661207098601b542ca632650211e83726d149c83b82753d1c6e175f17c598f1e61a98606fc44262b4eccf7faed85a4a1de"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-98d651640ab83e69834cca88ab16cf661207098601b542ca632650211e83726d149c83b82753d1c6e175f17c598f1e61a98606fc44262b4eccf7faed85a4a1de"' :
                                            'id="xs-components-links-module-SharedModule-98d651640ab83e69834cca88ab16cf661207098601b542ca632650211e83726d149c83b82753d1c6e175f17c598f1e61a98606fc44262b4eccf7faed85a4a1de"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EncargosService.html" data-type="entity-link" >EncargosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonPlaceholderService.html" data-type="entity-link" >JsonPlaceholderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonService.html" data-type="entity-link" >JsonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Encargo.html" data-type="entity-link" >Encargo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario-1.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario-2.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario-3.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario-4.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario-5.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});