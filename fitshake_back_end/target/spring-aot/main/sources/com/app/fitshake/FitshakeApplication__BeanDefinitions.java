package com.app.fitshake;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link FitshakeApplication}.
 */
@Generated
public class FitshakeApplication__BeanDefinitions {
  /**
   * Get the bean definition for 'fitshakeApplication'.
   */
  public static BeanDefinition getFitshakeApplicationBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(FitshakeApplication.class);
    beanDefinition.setInstanceSupplier(FitshakeApplication::new);
    return beanDefinition;
  }
}
