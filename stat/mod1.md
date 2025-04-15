## Chapter 14 Basic Principles of Statistical Inference

### 14.1 Estimation and testing of hypotheses
Since a sample is only part of a population, the features of the former will generally differ from those of the latter. The question that naturally arises is then : what can be said about the properties of the population from a knowledge of the properties of the sample ? Although a satisfactory answer to this question may not be found in all cases, in the case of random sampling it can be answered with the help of probability theory. In sampling theory, we are primarily concerned with this very question. The process of going from the known sample to the unknown population has been called **statistical inference**.

The basic problem of sampling theory stated above usually presents itself in one of two forms : (a) Some feature of the population in which an enquirer is interested may be completely unknown to him, and he may want to make a guess about this feature completely on the basis of a random sample from the population. (b) Some information of a tentative nature regarding the feature of the population may be available to the enquirer, and he may want to see whether the information is tenable in the light of the random sample taken from the population. The first type of problem is the problem of **estimation** and the second the problem of **testing of hypotheses**.

We shall assume in this chapter and in Chapter 15 that the form of the population distribution (binomial, normal, etc.) is either known or is not of importance to the enquirer in the particular context. He may still be interested in some unknown parameter or parameters of the distribution. The usual problem is then to estimate the unknown parameters or to test some hypotheses regarding these parameters on the basis of the given sample. In later chapters, we shall also consider the problem of testing hypotheses regarding the form of a population distribution.

### 14.2 Point estimation of parameters
Let $\theta$ be an unknown parameter of the distribution of a variable $x$. For estimating $\theta$ on the basis of a random sample, $x_1, x_2, ..., x_n$, we may use a particular statistic $T$. Then $T$ is the estimator of $\theta$, and the value of $T$ obtained from a given sample is its estimate. Clearly, for $T$ to be a good estimator, the difference $|T - \theta|$ should be as small as possible. However, since $T$ is itself a random variable, all that we can hope to ensure is that difference be small with a high probability.

**Unbiasedness and minimum variance**
One way of achieving this would be to see that the sampling distribution of $T$ has a central tendency towards $\theta$ and a small dispersion. If we agree to accept the mean as the proper measure of central tendency and the variance as the proper measure of dispersion, then we would want that $T$ should be **unbiased**, i.e.,
$$E(T) = \theta,$$
whatever the true value of $\theta$ may be,  ... (14.1)
and that, among all unbiased estimators, $T$ should have the smallest variance, i.e.,
$$var(T) \le var(T'),$$
whatever the true value of $\theta$ may be,  ... (14.2)
where $T'$ is any other unbiased estimator.
A statistic $T$ of this type is called a **minimum-variance unbiased estimator** of $\theta$.

**Example 14.1** It has been shown (in Section 13.4) that if we consider Bernoulli trials with probability of success $p$ for each trial and if $f$ be the number of successes in $n$ such trials, then
$$E(f/n) = p,$$
whatever the true value of $p$. Hence $f/n$ is an unbiased estimator of $p$. It can also be shown that, among all unbiased estimators, $f/n$ has the smallest variance. Hence $f/n$ is a minimum-variance unbiased estimator of $p$.

**Example 14.2** If $x_1, x_2, ..., x_n$ be a random sample from a population with mean $\mu$ and if $\bar{x}$ be the sample mean, then
$$E(\bar{x}) = \mu,$$
whatever the true value of $\mu$, so that $\bar{x}$ is an unbiased estimator of $\mu$ (vide Section 13.3). Suppose further that the observations are not only random but also independent and that the population is normal with mean $\mu$ and variance $\sigma^2$. Here it can be shown that $\bar{x}$ has the least variance among all unbiased estimators of $\mu$; i.e., $\bar{x}$ is a minimum-variance unbiased estimator of $\mu$.

**Consistency and efficiency**
An alternative approach would be to demand that the estimator should behave more and more satisfactorily as the sample size $n$ becomes larger and larger. In particular, it may be required that the values of $T_n$, which purports to be a good estimator, should be more and more clustered around $\theta$ with increasing sample size. To put it in probabilistic terms, it may be required that the statistic $T_n$ should **converge stochastically** (i.e. in probability) to $\theta$ as $n \rightarrow \infty$. In other words, given two positive quantities, $\epsilon$ and $\eta$, however small, it should be possible to find an $n_0$, depending on $\epsilon$ and $\eta$, such that

$$ P[|T_n - \theta| \le \epsilon] > 1 - \eta $$ 
... (14.3)

whenever $n \ge n_0$. A statistic $T_n$, based on a sample of size $n$, with this property is called a **consistent estimator** of $\theta$.

**Theorem 14.1** If $T_n$ is a sequence of estimators of $\theta$ such that $E(T_n) \rightarrow \theta$ and $var(T_n) \rightarrow 0$ as $n \rightarrow \infty$, then $T_n$ is consistent for $ \theta $.

**Proof :** We have

$$ P[|T_n - \theta| \le \epsilon] = 1 - P[|T_n - \theta| > \epsilon] $$

$$\ge 1 - \frac{E[(T_n - \theta)^2]}{\epsilon^2}, \text{ for every } \epsilon > 0$$
(by Chebyshev's inequality)
$$E[(T_n - \theta)^2] = E[(T_n - E(T_n)) + (E(T_n) - \theta)]^2$$
$$= E[(T_n - E(T_n))^2] + 2 E[(T_n - E(T_n))(E(T_n) - \theta)] + E[(E(T_n) - \theta)^2]$$
$$= var(T_n) + [E(T_n) - \theta]^2$$
$$P[|T_n - \theta| \le \epsilon] \ge 1 - \frac{var(T_n) + [E(T_n) - \theta]^2}{\epsilon^2}$$
$$\rightarrow 1 \text{ as } n \rightarrow \infty$$
because $var(T_n) \rightarrow 0$ and $E(T_n) \rightarrow \theta$.

Theorem 14.1 gives a set of sufficient conditions for $T_n$ to be consistent for $\theta$.

There may be found a large number of consistent estimators for $\theta$. Indeed, if $T_n$ be consistent, so are, e.g., $T_n + \frac{a}{n}$ and $T_n + \frac{a}{\psi(n)}$, where $a$ is any constant independent of $n$ and $\psi(n)$ is any increasing function of $n$.

To choose among these rival estimators, some additional criterion would be needed. Thus we may consider, together with stochastic convergence, the rate of stochastic convergence; i.e., we may demand not only that $T$ should converge stochastically to $\theta$ but that it should do so sufficiently rapidly. We shall confine our attention to consistent estimators that are **asymptotically normally distributed** (vide Chapter 17). In that case, the rapidity of convergence will be indicated by the inverse of the variance of the asymptotic distribution. Denoting the asymptotic variance by 'avar', we may then say that $T$ is the best estimator of $\theta$ if it is consistent and normally distributed and if
$$avar(T) \le avar(T'),$$
whatever the other consistent and asymptotically normal estimator $T'$ may be.

A consistent, asymptotically normal statistic $T$ having this property is called **efficient**.

**Example 14.3** Consider the proportion of successes, $f/n$, for a set of $n$ Bernoulli trials with probability of success $p$. From Corollary 7.15.2 (or Theorem 14.1) it follows that $f/n$ is a consistent estimator of $p$.

Further, the fact that $f$ has the binomial distribution, with parameters $n$ and $p$, means that $f$ is asymptotically normally distributed with mean $np$ and variance $np(1-p)$. Hence $f/n$ is seen to be asymptotically normally distributed with expectation $p$ and variance $p(1-p)/n$. Since this can also be shown to be the smallest asymptotic variance for an asymptotically normally distributed consistent estimator of $p$, $f/n$ is also efficient.

**Example 14.4** Let $x_1, x_2, ..., x_n$ be independent random observations from a normal distribution with mean $\mu$ and variance $\sigma^2$. If $\sigma^2$ is finite, it follows from Theorem 14.1 that the sample mean $\bar{x}$ is a consistent estimator of $\mu$.

Now the sampling distribution of $\bar{x}$ is exactly normal with mean $\mu$ and (exact) variance $\sigma^2/n$. Also, $\sigma^2/n$ can be shown to be the smallest asymptotic variance for an asymptotically normally distributed estimator of $\mu$. Hence $\bar{x}$ is also an efficient estimator of $\mu$.

On the contrary, the sample median $\bar{x}^*$ has

$$E(\bar{x}^*) \stackrel{a}{=} \mu$$ 
... (14.4a)

$$var(\bar{x}^*) \stackrel{a}{=} \pi \sigma^2 / 2n$$ 
... (14.4b)

Since $E(\bar{x}^*) \rightarrow \mu$ and $var(\bar{x}^*) \rightarrow 0$ as $n \rightarrow \infty$, the sample median is a consistent estimator of $\mu$. Like $\bar{x}$, $\bar{x}^*$ is asymptotically normal. But since $\bar{x}^*$ has asymptotic variance $\pi \sigma^2 / 2n$, which is greater than $\sigma^2/n$, it is an inefficient estimator.

**Sufficiency**
The criteria of consistency and efficiency for a good estimator have been suggested by R. A. Fisher.

Now, a preliminary choice among statistics for the purpose of estimating $\theta$, before looking for a minimum-variance unbiased or an efficient consistent estimator, can be made on the basis of another criterion suggested by Fisher. This is the criterion of **sufficiency**. A statistic $T$ is called **sufficient** for $\theta$ (or, rather, for the family of distributions characterised by $\theta$) if the conditional distribution of any other statistic for given $T$ is independent of $\theta$. Obviously, if $T$ is of this type, then any inference regarding $\theta$ can be made on the basis of $T$ alone, instead of starting with all $n$ observations. In other words, $T$ provides a method of summarising the information regarding $\theta$ contained in the whole sample into a single statistic. We state below a criterion for determining sufficient statistics.

**Theorem 16.2 (Factorization Criterion)** A necessary and sufficient condition for $T$ to be sufficient for $\theta$ is that the joint probability-density function (or the joint probability-mass function) of $x_1, x_2, ..., x_n$, say $f(x_1, x_2, ..., x_n | \theta)$ should be of the form
$$f(x_1, x_2, ..., x_n | \theta) = g(T | \theta) h(x_1, x_2, ..., x_n),$$ ... (14.5)
where the first part of the right-hand side is a non-negative function of $T$ and $\theta$, while the second part is a non-negative function of $x_1, x_2, ..., x_n$ only and is independent of $\theta$.

This provides a simple method of judging whether $T$ is really a sufficient statistic.

**Example 14.5** Consider a set of $n$ Bernoulli trials with probability of success $p$. With the $i^{th}$ trial we may associate a variable $x_i$ having probability-mass function
$$f(x_i | p) = p^{x_i} (1-p)^{1-x_i}, \text{ for } x_i = 0, 1.$$
The joint probability-mass function of $x_1, x_2, ..., x_n$ is
$$f(x_1, x_2, ..., x_n | p) = \prod_{i=1}^{n} p^{x_i} (1-p)^{1-x_i} = p^{\sum x_i} (1-p)^{n - \sum x_i}.$$
Let $f = \sum x_i$. Then
$$f(x_1, x_2, ..., x_n | p) = p^{f} (1-p)^{n-f} \times 1 = g(f | p) h(x_1, x_2, ..., x_n),$$
where
$$g(f | p) = p^{f} (1-p)^{n-f}$$
and
$$h(x_1, x_2, ..., x_n) = 1.$$
Hence $f = \sum x_i$, the number of successes in the $n$ trials taken together, is a sufficient statistic for $p$. So $f/n$ is sufficient.

**Example 14.6** Let $x_1, x_2, ..., x_n$ be as in Example 14.4. Suppose further that $\mu$ is unknown but $\sigma^2$ is known. Then the joint density function of $x_1, x_2, ..., x_n$ is
$$f(x_1, x_2, ..., x_n | \mu) = (\frac{1}{\sigma \sqrt{2\pi}})^n \exp [-\frac{1}{2 \sigma^2} \sum_{i=1}^{n} (x_i - \mu)^2].$$
Now
$$\sum_{i=1}^{n} (x_i - \mu)^2 = \sum_{i=1}^{n} (\bar{x} - \mu + x_i - \bar{x})^2 = \sum_{i=1}^{n} ((\bar{x} - \mu) + (x_i - \bar{x}))^2$$
$$= \sum_{i=1}^{n} (\bar{x} - \mu)^2 + 2 (\bar{x} - \mu) \sum_{i=1}^{n} (x_i - \bar{x}) + \sum_{i=1}^{n} (x_i - \bar{x})^2$$
$$= n(\bar{x} - \mu)^2 + \sum_{i=1}^{n} (x_i - \bar{x})^2$$
since $\sum_{i=1}^{n} (x_i - \bar{x}) = 0$.
Therefore,
$$f(x_1, x_2, ..., x_n | \mu) = (\frac{1}{\sigma \sqrt{2\pi}})^n \exp [-\frac{n}{2 \sigma^2} (\bar{x} - \mu)^2] \exp [-\frac{1}{2 \sigma^2} \sum_{i=1}^{n} (x_i - \bar{x})^2] = g(\bar{x} | \mu) h(x_1, x_2, ..., x_n),$$
where
$$g(\bar{x} | \mu) = (\frac{1}{\sigma \sqrt{2\pi}})^n \exp [-\frac{n}{2 \sigma^2} (\bar{x} - \mu)^2]$$
and
$$h(x_1, x_2, ..., x_n) = \exp [-\frac{1}{2 \sigma^2} \sum_{i=1}^{n} (x_i - \bar{x})^2].$$
Hence $\bar{x}$, as well as $n\bar{x} = \sum x_i$, is a sufficient statistic for $\mu$.

**Example 14.7** Let $x_1, x_2$ be independently and identically distributed as Poisson variables with parameter $\theta$. Then $x_1 + 2x_2$ is not a sufficient statistic for $\theta$. Consider the conditional probability $P[x_1 = 1, x_2 = 1 | x_1 + 2x_2 = 3]$.
$$P[x_1 = 1, x_2 = 1 | x_1 + 2x_2 = 3] = \frac{P[x_1 = 1, x_2 = 1, x_1 + 2x_2 = 3]}{P[x_1 + 2x_2 = 3]} = \frac{P[x_1 = 1, x_2 = 1]}{P[x_1 + 2x_2 = 3]}$$
$$P[x_1 = 1, x_2 = 1] = P[x_1 = 1] P[x_2 = 1] = \frac{e^{-\theta} \theta^1}{1!} \frac{e^{-\theta} \theta^1}{1!} = \theta^2 e^{-2\theta}$$
$$P[x_1 + 2x_2 = 3] = P[x_1 = 1, x_2 = 1] + P[x_1 = 3, x_2 = 0]$$
$$= \frac{e^{-\theta} \theta^1}{1!} \frac{e^{-\theta} \theta^1}{1!} + \frac{e^{-\theta} \theta^3}{3!} \frac{e^{-\theta} \theta^0}{0!} = \theta^2 e^{-2\theta} + \frac{\theta^3}{6} e^{-2\theta} = e^{-2\theta} (\theta^2 + \frac{\theta^3}{6})$$
$$P[x_1 = 1, x_2 = 1 | x_1 + 2x_2 = 3] = \frac{\theta^2 e^{-2\theta}}{e^{-2\theta} (\theta^2 + \frac{\theta^3}{6})} = \frac{1}{1 + \theta/6} = \frac{6}{6 + \theta}$$
Since this conditional probability is not independent of $\theta$. Hence $x_1 + 2x_2$ is not sufficient.