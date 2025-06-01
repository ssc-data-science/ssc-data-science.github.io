f = inline('1./(1+exp(-x))');   % definition of sigmoid

[n,m]=size(train);  % number of pixels and number of examples
s=sqrt(n);
eta=0.1;  % learning rate
epsinit=0.01;  % parameter controlling magnitude of initial conditions
w=epsinit*randn(n,1);   % initialization with Gaussian random values
b=epsinit*randn;

tmax=10000;
errsq=zeros(tmax,1);   % squared error on training set

for t=1:tmax
  i=ceil(m*rand);
  x=double(train(:,i))/255;   % uint8 -> double, normalize max value to one
  y=double(trainlabels(i));
  actual=f(w'*x+b);
  error=y-actual;
  slope=actual*(1-actual);
  errsq(t)=error'*error;
  delta=slope*error;  % error signal scaled by derivative
  w=w+eta*delta*x;
  b=b+eta*delta;
  if rem(t,100)==0
    subplot(2,1,1)
    imagesc(reshape(w,s,s))
    title(sprintf('w, t=%d',t))
    axis image off
    colormap gray
    subplot(2,1,2)
    plot(1:t,cumsum(errsq(1:t))./(1:t)')
    drawnow
  end
end                                  

disp(sprintf('mean squared error: %.4f',mean(errsq)))
